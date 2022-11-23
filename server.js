const connection = require('./db')
const express = require("express");
const {category,add_category,update_category} = require("./routes/category.js")
const {products_search,productpost,products_update} = require("./routes/product.js")
const {signup,otp_verify,user_register} = require("./routes/auth.js")
const {add_to_cart,cart} = require("./routes/cart.js")


const cors = require("cors");
const app = express();

var corsOptions = {
  origin: "http://localhost:3000"
};

app.use(cors(corsOptions));
app.use(express.json());

//app.use(express.urlencoded({ extended: true }));


//----------------category----routes------------------------
app.get("/category", category)
app.post("/add_category", add_category)
app.put("/update_category",update_category)

//----------------products---routes----------------------
app.post("/products_search",products_search)
app.post("/products",productpost)
app.put("/products_update",products_update)

//----------------sign-up---routes----------------------
app.post("/sign_up",signup)
app.post("/otp_verification",otp_verify)
app.post("/user_register",user_register)

//----------------cart--------------------
app.post("/add_to_cart",add_to_cart)
app.get("/cart",cart)

//___________________invalid_url_error______________
app.get("*", function(req, res){
  res.send({"Error":"invalid url"})
  })





//----------------app--listen--------------
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

