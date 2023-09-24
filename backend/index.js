const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const { error } = require("console");
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// YSeTWOEjWwTtF13o

const uri =
  "mongodb+srv://crud-project:YSeTWOEjWwTtF13o@cluster0.yxzgo8g.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function dbConnect() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    console.log("Server Connect With Database");
  } catch (error) {
    console.log(error.name, error.message);
  }
}
dbConnect().catch(console.dir);

/*
DATABASE CONNECTION NAME
=====================================================
*/
const productsData = client.db("AllProducts").collection("Products");

/*
POST REQUIST
=====================================================
*/
app.post("/products", async (req, res) => {
  try {
    const result = await productsData.insertOne(req.body);

    if (result.insertedId) {
      res.send({
        success: true,
        message: `Product Uploaded Successfuly ${req.body.ProductName}`,
      });
    } else {
      res.send({
        success: false,
        message: `Product Upload Fail`,
      });
    }
  } catch (error) {
    res.send({
      success: false,
      error: error.message,
    });
  }
});

/*
GET REQUIST
=====================================================
*/
app.get("/products", async (req, res) => {
  try {
    const result = await productsData.find({}).toArray();
    res.send({
        success : true,
        message : `Successfully Got The Product Data`,
        data : result
    })
  } catch (error) {
    res.send({
      success: false,
      error: error.message,
    });
  }
});


/*
DELETE REQUIST
=====================================================
*/
app.delete('/products/:id', async (req, res)=>{
    try{
        const id = req.params.id 
        const query = {_id : new ObjectId(id)}
        const result = await productsData.deleteOne(query)
    
        if(result.deletedCount){
            res.send({
                success : true,
                message : `Product Deleted Successfully`
            })
        }
        else{
            res.send({
                success : false,
                message : `Product Are not Deleted`
            })
        }
    }
    catch(error){
        res.send({
            success : false,
            error : error.message
        })
    }
})


/*
UPDATE REQUIST
=====================================================
*/
app.get('/update/:id', async (req, res)=>{
    try{
        const id = req.params.id 
        const query = {_id : new ObjectId(id)}
        const result = await productsData.findOne(query)
        res.send(result)
    }
    catch{
        res.send({
            success : true,
            error : error.message
        })
    }
})

app.put('/update/:id', async (req, res)=>{
    try{
        const id = req.params.id 
        const updateProduct = req.body
        const query = {_id : new ObjectId(id)}
        const options = { upsert: true };
        const updateDoc = {
            $set: {
            //   plot: `A harvest of random numbers, such as: ${Math.random()}`
                ProductName : updateProduct.ProductName,
                ProductPrice : updateProduct.ProductPrice
            },
          };
        const result = await productsData.updateOne(query, updateDoc, options);
        
        if(result.acknowledged){
            res.send({
                success : true, 
                message : `Product Updated Successfully`
            })
        }
    }
    catch{
        res.send({
            success : true,
            error : error.message
        })
    }
})



app.get("/", (req, res) => {
  res.send(`Server Is Running`);
});

app.listen(port, () => {
  console.log(`Server Running Port : ${port}`);
});
