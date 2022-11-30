const connection = require('./db')
const express = require("express");
const multer  = require('multer');
const path  = require('path');
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");

const {category,add_category,update_category,delete_category,search_category} = require("./routes/category.js")
const {products_search,productpost,products_varient_update,products_update,products_delete,products_varient_add,products_pricing,product} = require("./routes/product.js")
const {signup,otp_verify,user_register,user_details} = require("./routes/auth.js")
const {add_to_cart,cart} = require("./routes/cart.js")
const {admin_login,update_password,admin_forgot_password,update_admin,add_admin,admin_search,admin} = require("./routes/admin.js")
const {orders,order_deteils,orders_list,order_status_change} = require("./routes/orders.js")
const {invoice_list,invoice_search,invoice_details} = require("./routes/invoice_list.js")



var corsOptions = {
  origin: "http://localhost:3000"
};

app.use(cors(corsOptions));
app.use(express.json());

app.use(express.urlencoded({ extended: true }));
// app.use(bodyParser.urlencoded({extended: true,}));


var storage = multer.diskStorage({
  destination: (req, file, callBack) => {
      callBack(null, './public/catgory_images/')     // './public/images/' directory name where save the file
  },
  filename: (req, file, callBack) => {  
      callBack(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
  }
})

var upload = multer({
  storage: storage
  // dest:'./public/catgory_images'
})
// var storageP = multer.diskStorage({
//   destination: (req, file, callBack) => {
//       callBack(null, './public/catgory_images/')     // './public/images/' directory name where save the file
//   },
//   filename: (req, file, callBack) => {
//     console.log(file.fieldname)
//       callBack(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
//   }
// })

// var uploadP = multer({
//   storageP: storageP
// })



//----------------category----routes------------------------
app.get("/category", category)
app.post("/add_category",upload.single('image'),add_category)
app.put("/update_category",update_category) 
app.put("/delete_category",delete_category) 
app.post("/search_category",search_category)

//_______________products---routes___________________
app.post("/products_search",products_search)
app.post("/products",productpost)
app.put("/products_varient_update",products_varient_update)
app.put("/products_update",products_update)
app.put("/products_delete",products_delete)
app.post("/products_varient_add",products_varient_add)
app.get("/product",product)
app.get("/products_pricing",products_pricing)
//________________user-sign-up_______________________
app.post("/sign_up",signup)
app.post("/otp_verification",otp_verify)
app.post("/user_register",user_register)
app.get("/user_details",user_details)

//_____________________cart__________________________
app.post("/add_to_cart",add_to_cart)
app.get("/cart",cart)

//_________________admin_login_______________________
app.post("/admin_login", admin_login)
app.put("/update_password",update_password)
app.put ("/admin_forget_password",admin_forgot_password)
app.put("/update_admin",update_admin)
app.post("/add_admin",add_admin)
app.post("/admin_search",admin_search)
app.get("/admin", admin)
//________________order______________________________
app.post("/orders",orders)
//app.post("/orders",order_search)
app.get("/order_deteils",order_deteils)
app.post("/orders_list",orders_list)
app.put("/order_status_change",order_status_change)

//_______________invoice_list________________________
app.get("/invoice_list",invoice_list)
app.post("/invoice_search",invoice_search)
app.get("/invoice_details",invoice_details)

//_________________special_and_fetures__product___


//___________________invalid_url_error_______________
app.get("*", function(req, res){
  res.send({"Error":"invalid url"})
  })





//----------------app--listen--------------
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

