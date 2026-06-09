const mongoose = require("mongoose");
const ProductSchema = new mongoose.Schema({
    img:String,
    name:String, 
    price:String, 

});
module.exports = mongoose.model("Product",ProductSchema )

