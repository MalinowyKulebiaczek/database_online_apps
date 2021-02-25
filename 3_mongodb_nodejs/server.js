//Oswiadczam, ze niniejsza praca stanowiaca podstawe do uznania osiagniecia efektow uczenia sie z
//przedmiotu OPA zostala wykonana przeze mnie samodzielnie.
//Rafal Wiercioch 293439

'use strict';
const express = require('express')
const app = express()
const port = 3000
var path = require('path');

const {MongoClient} = require('mongodb');
var url = "mongodb://localhost:27017"

app.use((req, res, next) => {
    console.log(req.url);
    next();
});

//Assertion
function assert(condition, message){
    if(!condition) throw Error('Assert failed: ' + (message || ''));
}

//Adding data
async function insertOne(client, element){
    const result = await client.db("opa").collection("cars").insertOne(element);
    console.log('InsertedID: '+`${result.insertedId}`);
}

async function addData(p, b, m, y, t_s, mil, c){
    const uri = "mongodb://localhost:27017";
    const client = new MongoClient(uri);
    try {
        await client.connect();
        
        var element={price: p, brand: b, model: m, year: y, title_status: t_s, mileage: mil, color: c}
        insertOne(client, element)
    } catch (e) {
        res.status(500).send("error in adding to database: "+e)
    } finally {
        await client.close();
    }
}

//Print data
async function readCars(req, res){
    const client = new MongoClient(url);
    try{
        await client.connect();
        var cars = await client.db("opa").collection("cars").find({}).toArray();
        res.send(cars);
    } catch(e) {
        res.status(500).send("Error: "+e)
    } finally {
        await client.close();
    }
}


app.get("/", (req, res) => {
    readCars(req,res);
})

//form for adding cars
app.get('/add', (req,res) => {
    res.sendFile(path.join(__dirname + '/add-cars.html'))
})

//reading from form
app.use(express.urlencoded({
    extended: true
}))

app.post('/add-cars', (req,res) => {
    try{
        var p = parseInt(req.body.price)
        var b = req.body.brand
        var m = req.body.model
        var y = parseInt(req.body.year)
        var t_s = req.body.title_status
        var mil = parseFloat(req.body.mileage)
        var c = req.body.color

        assert(p!==null && p>0, 'price value is wrong or was not specified')
        assert(b!==null && b!=='', 'brand value is wrong or was not specified')
        assert(m!==null && m!=='', 'model value is wrong or was not specified')
        assert(y!==null && y>0, 'year value is wrong or was not specified')
        assert(t_s!==null && t_s!=='', 'title_status value is wrong or was not specified')
        assert(mil!==null && mil>0, 'mileage value is wrong or was not specified')
        assert(c!==null && c!=='', 'color value is wrong or was not specified')
        addData(p, b, m, y, t_s, mil, c)
        //addData(4444, 'batmobil3', 'gtx300', 2010, "clean vehicle", 300.0, "black")
    } catch(e) {
        res.status(500).send("/add-cars error: "+e)
    } 
    res.redirect('/')
})


app.listen(port, () => {
    console.log('Example app listening at' + ` http://localhost:${port}`);
})