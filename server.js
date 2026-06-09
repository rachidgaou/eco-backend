require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Contact = require("./models/Contact");
const Product = require("./models/Product")

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

// MongoDB connection:::::::::::::::::::::::::::::::::::::
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// Home route::::::::::::::::::::::::::::::::::::::::::::::
app.get("/", (req, res) => {
  res.send("your server is working");
});

// CREATE (MongoDB):::::::::::::::::::::::::::::::::
app.post("/contact", async (req, res) => {
  try {
    const newContact = await Contact.create(req.body);
    res.json(newContact);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
//................................
app.post ("/product1", async (req,res)=>{
  try {
    const newProduct = await Product.create(req.body);
    res.json(newProduct);

  } catch (err){
    res.status(500).json({error: err.message})
  }
})

// READ (MongoDB)::::::::::::::::::::::::::::::::::::::::::
app.get("/contact", async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
//............................
app.get("/product1",  async(req,res)=>{
  try{ 
    const products = await Product.find();
    res.json(products);

  } catch (err){ res.status(500).json({error: err.message})}
})



/////////////////deleting ....................
app.delete("/contact/:id", async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);
    res.json({ message: "Contact deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
//................................
app.delete("/product1/:id", async (req, res)=>{
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({message: "Contact deleted successfully"})
  } catch (err){ res.status(500).json({error:err.message})}
})
//////////:editing.........................
app.put("/contact/:id", async (req, res) => {
  try {
    const updated = await Contact.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
//...........................................
app.put ("/product1:id", async(req,res)=>{
  try{
    const updated = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      {new: true}
    );
    res.json(updated)
  } catch (err){
    res.status(500).json({error:err.message})
  }

})

//////////sending//////////////////////////:
app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
