const MongoClient = require("mongodb").MongoClient;
const url = "mongodb://localhost/project";
var mongodb;

async function connect(callback) {
  await MongoClient.connect(
    url,
    { useNewUrlParser: true, useUnifiedTopology: true },
    async function(err, db) {
      mongodb = await db;
     
      if (mongodb) callback();
      else console.log("MongoDb not connected..!");
    }
  );
}

function get() {
  return mongodb;
}

function close() {
  mongodb.close();
}

module.exports = { connect, get, close };