//import uuid
const uuidv4 = require('uuid/v4');

//Azure Bus
var azure = require('azure');
var path = 'Endpoint=sb://servicequeues.servicebus.windows.net/;SharedAccessKeyName=RootManageSharedAccessKey;SharedAccessKey=AUNiefT6dHz3ivqbYvpteI+LlwvOWE2M0OleRycSXzs=';
var serviceBusService = azure.createServiceBusService(path);

//MySQL stuff
const mysql = require('mysql2');
var config =
    {
        host: 'ww-data-host.mysql.database.azure.com',
        user: 'database@ww-data-host',
        password: 'uJHeCu3P!',
        port: 3306,
        database: 'groupPermissionDb',
        ssl: true
    };
const conn = new mysql.createConnection(config);
const queureName = "issue"


serviceBusService.receiveQueueMessage((queureName + '-recieve'), function (error, receivedMessage) {
    if (!error) {
        // Message received and deleted
        switch (receivedMessage.type) {
            case "New_Issue":   
                newIssue(receivedMessage);
                break; 
            case "Reopen":
                changeState(message.payload.id);
                break;
            case "Close":
                changeState(message.payload.id);
                break;
            case "Comment":
                comment();//TODO
                break;
            case "Ceate_Tag":
                createTag();
                break;
            case "Delete_Tag":
                delteTag();
                break;
            case "Add_Tag":
                addTag();
                break;
            case "Remove_Tag":
                removeTag();
                break;
            

        }
    }
});


function newIssue(message) {

    var sql = "INSERT INTO Issue (id, creatorID, issueGroupID, projectId, issueHead, issueText, open, reopen, date) VALUES (?,?,?,?,?,?,?,?, ?);";
    var values = [message.payload.id, message.payload.creatorId, message.payload.issueGroupId, message.payload.projectId, message.payload.Caption, message.payload.text, message.payload.isOpen, message.payload.reopen, message.payload.date];

    conn.query(sql, values, function (err, results, fields) {
        if (err) throw err;
    });
}

function changeState(id) {
    var sql = "UPDATE Issue SET open = !open WHERE id ==" + id;

    conn.query(sql, function (err, results, fields) {
        if (err) {
            throw err;
        } else {
            
        }
    });
}


function send(message) {
    serviceBusService.sendQueueMessage((queureName + '-send'), message, function (error) {
    });
}

//loop (request new messages)
function requestMessage() {
    asbService.receiveQueueMessage((queureName + '-recieve'), handleMessage);
}

function handleMessage(error, receivedMessage) {
    if (error) {
        requestMessage();
        return;
    }

    processMessage(receivedMessage);
    requestMessage();
}

function processMessage(message) {
    console.log(message);
}