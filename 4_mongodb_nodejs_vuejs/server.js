const express = require('express')
const app = express();
const port = 3000


const {MongoClient, ObjectId} = require('mongodb');
var url = "mongodb://localhost:27017";

app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
 });

var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies


app.use(express.static('static'))


app.get('/webresources/cars', (req, res) => {
    MongoClient.connect(url, function(err, db) {
        if(err)
            res.status(500).json({error: err})
        else {
            var opaDB = db.db("opa");
            var collection = opaDB.collection("cars");  
            opaDB.collection("cars").find({}).toArray(function(err, result) {
                db.close();
                if (err) {
                    res.status(500).json({error: err});
                } else {
                    res.send(result);
                }
            });
        }
    });
})




app.post('/webresources/cars', (req, res) => {
    console.log(req.body);
    data = {
        price: req.body.price,
        brand: req.body.brand,
        model: req.body.model,
        year: req.body.year,
        title_status: req.body.title_status,
        mileage: req.body.mileage,
        color: req.body.color
        //: req.body.specjalnosc.split('\n')
    }
    console.log(data);      // \todo validate data !!!
    
    MongoClient.connect(url, function(err, db) {
        if(err)
            res.status(500).json({error: err})
        else {
            var opaDB = db.db("opa");
            var collection = opaDB.collection("cars");    
            collection.insertOne(data, function(err, result) {
                db.close();
                if(err) {
                    res.status(500).json({error: err})
                } else {
                    res.send("Car added: id=" + result.insertedId);
                }
            });
        }
    });
})


app.post('/webresources/delete-cars', (req, res) => {
    console.log(req.body);
    data = {
        _id: ObjectId(req.body.id),
        //: req.body.specjalnosc.split('\n')
    }
    console.log(data);      // \todo validate data !!!
    console.log("server: ", data);
    MongoClient.connect(url, function(err, db) {
        if(err)
            res.status(500).json({error: err})
        else {
            var opaDB = db.db("opa");
            var collection = opaDB.collection("cars");
            collection.deleteOne(data, function(err, result) {
                db.close();
                if(err) {
                    res.status(500).json({error: err})
                } else {
                    res.send("Car deleted: id=" + result.deletedCount);
                }
            });
        }
    });
})

app.post('/webresources/modify-cars', (req, res) => {
    console.log(req.body);
    data = {
        _id: ObjectId(req.body.id),
        price: req.body.price,
        brand: req.body.brand,
        model: req.body.model,
        year: req.body.year,
        title_status: req.body.title_status,
        mileage: req.body.mileage,
        color: req.body.color
        //: req.body.specjalnosc.split('\n')
    }
    console.log(data);      // \todo validate data !!!
    console.log("server: ", data);
    MongoClient.connect(url, function(err, db) {
        if(err)
            res.status(500).json({error: err})
        else {
            var opaDB = db.db("opa");
            var collection = opaDB.collection("cars");

            collection.updateOne({ _id : data._id }, {$set :
                {price: data.price, model: data.model, brand: data.brand, model: data.model, year: data.year,
                title_status: data.title_status, mileage: data.mileage, color: data.color}}, function(err, result) {
                db.close();
                if(err) {
                    res.status(500).json({error: err})
                } else {
                    res.send("Car deleted: id=" + result.deletedCount);
                }
            });
        }
    });
})

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
app.listen(port, () => {
    console.log(`Example app listening at ` + 
                `http://localhost:${port}`   );
  })
