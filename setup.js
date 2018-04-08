
const mysql = require('mysql2');
var config = {
    host: 'icon-db.mysql.database.azure.com',
    user: 'wolf@icon-db',
    password: 'EJ6chESAmK',
    port: 3306,
    ssl: true
};
const conn = new mysql.createConnection(config);

conn.connect(
    function (err) {
        if (err) {
            console.log("!!! Cannot connect !!! Error:");
            throw err;
        }
        else {
            console.log("Connection established.");
            var sql = "DROP DATABASE issueDb;";
               
            conn.query(sql, function (err, results, fields) {
                if (err) {
                    throw err;
                }
            });
            sql =[
                "create Database issueDb;",
                "USE issueDb CREATE TABLE `Issue` (`id` varchar(50) NOT NULL,`creatorID` varchar(50) NOT NULL,`issueGroupID` varchar(50) NOT NULL UNIQUE,`projectId` varchar(50) NOT NULL,`issueHead` TEXT NOT NULL UNIQUE,`issueText` TEXT NOT NULL,`open` bool NOT NULL,`reopen` bool NOT NULL,`date` DATE NOT NULL, PRIMARY KEY (`id`));",
                "USE issueDb CREATE TABLE `Group` (`id` varchar(50) NOT NULL,`groupName` varchar(50) NOT NULL UNIQUE,PRIMARY KEY (`id`));",
                "USE issueDb CREATE TABLE `Tag` (`id` varchar(50) NOT NULL,`tagLabel` varchar(50) NOT NULL UNIQUE,PRIMARY KEY (`id`));",
                "USE issueDb CREATE TABLE `Comments` (`id` varchar(50) NOT NULL,`issueID` varchar(50) NOT NULL,`userID` varchar(50) NOT NULL,`Comment` TEXT NOT NULL,PRIMARY KEY (`id`));",
                "USE issueDb CREATE TABLE `Lifecycle` (`id` varchar(50) NOT NULL,`IssueId` varchar(50) NOT NULL,`createTimestemp` TIMESTAMP NOT NULL,`type` varchar(50) NOT NULL,PRIMARY KEY (`id`));",
                "USE issueDb CREATE TABLE `TagIssue` (`tagId` varchar(50) NOT NULL,`issueId` varchar(50) NOT NULL,PRIMARY KEY (`tagId`,`issueId`));",
                "ALTER TABLE `Issue` ADD CONSTRAINT `Issue_fk0` FOREIGN KEY (`creatorID`) REFERENCES ``(``);",
                "ALTER TABLE `Issue` ADD CONSTRAINT `Issue_fk1` FOREIGN KEY (`issueGroupID`) REFERENCES `Group`(`id`);",
                "ALTER TABLE `Comments` ADD CONSTRAINT `Comments_fk0` FOREIGN KEY (`issueID`) REFERENCES `Issue`(`id`);",
                "ALTER TABLE `Lifecycle` ADD CONSTRAINT `Lifecycle_fk0` FOREIGN KEY (`IssueId`) REFERENCES `Issue`(`id`);",
                "ALTER TABLE `TagIssue` ADD CONSTRAINT `TagIssue_fk0` FOREIGN KEY (`tagId`) REFERENCES `Tag`(`id`);",
                "ALTER TABLE `TagIssue` ADD CONSTRAINT `TagIssue_fk1` FOREIGN KEY (`issueId`) REFERENCES `Issue`(`id`);",
            ];
            for (var i in sql) {
                conn.query(i, function (err, results, fields) {
                    if (err) {
                        throw err;
                    }
                });
            }

        }
    });

