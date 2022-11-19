const connection = require('./db')
const express = require("express");
const {category} = require("./routes/category.js")
const {products_search,productpost} = require("./routes/product.js")
const {signup,otp_verify,user_register} = require("./routes/auth.js")


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
app.post("/products_search",products_search)
app.post("/products",productpost)

//----------------sign-up---routes----------------------
app.post("/sign_up",signup)
app.post("/otp_verification",otp_verify)
app.post("/user_register",user_register)

//----------------app--listen--------------
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

