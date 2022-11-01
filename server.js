const connection = require('./db')
const express = require("express");
const {category} = require("./routes/category.js")
const {product,post} = require("./routes/product.js")


const cors = require("cors");
const app = express();

var corsOptions = {
  origin: "http://localhost:5000"
};

app.use(cors(corsOptions));
app.use(express.json());

//app.use(express.urlencoded({ extended: true }));


//----------------category----routes------------------------
app.get("/category", category)

//----------------products---routes----------------------
app.get("/products",product)
app.get("/products",product)




//----------------app--listen--------------
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});