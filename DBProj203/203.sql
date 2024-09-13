BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS "Pass" (
	"userID"	INTEGER,
	"application"	TEXT NOT NULL,
	"user"	TEXT NOT NULL,
	"pass"	TEXT NOT NULL,
	"note"	TEXT,
	PRIMARY KEY("userID" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "Regist" (
	"userID"	INTEGER NOT NULL,
	"username"	TEXT NOT NULL,
	"password"	TEXT NOT NULL,
	"email"	TEXT NOT NULL UNIQUE,
	"phone"	TEXT NOT NULL UNIQUE,
	PRIMARY KEY("userID" AUTOINCREMENT)
);
INSERT INTO "Pass" VALUES (1,'Facebook','Nichaaa','abd456!',NULL);
INSERT INTO "Pass" VALUES (2,'Line','Jenny','789DEF#',NULL);
INSERT INTO "Regist" VALUES (1,'Jennies466','1234','jennies466@gmail.com','0955652599');
COMMIT;
