const MongoClient = require('mongodb').MongoClient;
const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');

const url = process.env.NODE_ENV;
const app = express();
const port = 3000;
const dbName = "movie-app";
const collectionName = "movies";
let client = "";

app.use(bodyParser.json());

app.get('/list/active', async (req, res) => {
    const collection = client.db(dbName).collection(collectionName);
    const response = await collection.find({ status: { "$eq": "active" } }).toArray();
    res.send(JSON.stringify(response));
})

app.get('/list/inactive', async (req, res) => {
    const collection = client.db(dbName).collection(collectionName);
    const response = await collection.find({ status: { "$eq": "inactive" } }).toArray();
    res.send(JSON.stringify(response));
})

app.post('/create', async (req, res) => {
    const { name, year } = req.body;
    const collection = client.db(dbName).collection(collectionName);
    const response = await collection.insertOne({ name: name, year: year });
    res.send(JSON.stringify(response.result));
})

app.put('/updateMovie/:movieName', async (req, res) => {
    const { movieName } = req.params;
    const collection = client.db(dbName).collection(collectionName);
    const year= req.body.year;
    const response = await collection.updateOne(
        { name: movieName },
        {
            $set: {
                year : year
            }
        }
    );

    res.send(JSON.stringify(response.result));
})

app.delete('/deleteMovie/:movieName', async (req, res) => {
    const { movieName } = req.params;
    const collection = client.db(dbName).collection(collectionName);
    
    const response = await collection.deleteOne({ name: movieName });

    res.send(JSON.stringify(response.result));
})



app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

const connectToDatabase = async () => {
    console.log("Connected to the database");
    client = await MongoClient.connect(url);
}

connectToDatabase();