const { MongoClient } = require('mongodb');

/* const url = 'mongodb://localhost:27017'; */
const url = 'mongodb+srv://torocorp:123@test.ppak3.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const client = new MongoClient(url);

const dbName = 'cerraPayDB';


module.exports = {client, dbName};