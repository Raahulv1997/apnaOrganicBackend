const connection = require('./db')
const express = require("express");
const multer  = require('multer');
const path  = require('path');
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
require('dotenv').config();
const SERVER_PORT = process.env.SERVER_PORT

const {category,add_category,update_category,delete_category,search_category,get_all_category,category_details} = require("./routes/category.js")
const {products_search,productpost,products_varient_update,products_update,products_delete,products_varient_add,products_pricing,product} = require("./routes/product.js")
const {signup,otp_verify,user_register,user_details} = require("./routes/auth.js")
const {add_to_cart,cart, cart_update,remove_cart} = require("./routes/cart.js")
const {admin_login,update_password,admin_forgot_password,update_admin,add_admin,admin_search,admin,vendor_status_change,vendor_availability,vendor_requests} = require("./routes/admin.js")
const {orders,order_deteils,orders_list,order_status_change} = require("./routes/orders.js")
const {invoice_list,invoice_search,invoice_details} = require("./routes/invoice_list.js")
const {vendors,vendor_register,vendor_list,vendor_update} = require("./routes/vendor")
// const {vendors,vendor_signup,vendor_otp_verify,vendor_register,vendor_list,vendor_update} = require("./routes/vendor")
const {product_bulk_uploads} = require("./routes/product_bulk_uploads.js")
const {coupon,coupons_add,coupon_update,coupons_list,coupons_delete} = require("./routes/coupons")
const {review_rating,review_approved,review_list,review_detaile} = require("./routes/review")
const {add_complaint,complaint_details,complaint_update,complaint_search} = require("./routes/complaint")
const {user_products_search} = require("./routes/user.js")
const {add_wishlist,remove_product_from_wishlist} = require("./routes/wishlist.js")
const {payment,transaction_list,transaction_details} = require("./routes/transaction.js")



var corsOptions = {
  origin: "http://localhost:3000"
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.static('public'))


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

//_______________________________________________________________________________________________________________

    const imageStorage = multer.diskStorage({
  
        destination: './public/bulk_upload_xls', // Destination to store image 
        
        filename: (req, file, cb) => {
            cb(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname))
            // file.fieldname is name of the field (image), path.extname get the uploaded file extension
        }
      });
      
      const imageUpload = multer({
        storage: imageStorage,
        limits: {
            fileSize: 1000000   // 1000000 Bytes = 1 MB
        }
      }) 

//_____________________________________________________________________________________________________________________
   



// module.exports={imageUpload}


//----------------category----routes------------------------
app.get("/category", category)
app.post("/add_category",upload.single('image'),add_category)
app.put("/update_category",upload.single('image'), update_category) 
app.put("/delete_category",delete_category) 
app.post("/search_category",search_category)
app.get("/get_all_category",get_all_category)
app.get("/category_details",category_details)


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
app.post("/home",user_products_search)


//_____________________cart__________________________
app.post("/add_to_cart",add_to_cart)
app.get("/cart",cart)
app.put("/remove_product_from_cart",remove_cart)
app.put("/cart_update",cart_update)

//_________________admin_login_______________________
app.post("/admin_login", admin_login)
app.put("/update_password",update_password)
app.put ("/admin_forget_password",admin_forgot_password)
app.put("/update_admin",update_admin)
app.post("/add_admin",add_admin)
app.post("/admin_search",admin_search)
app.put("/vendor_status_change",vendor_status_change)
app.get("/admin", admin)
app.get("/vendor_requests", vendor_requests)
app.post("/vendor_list",vendor_list)

//________________order______________________________
app.post("/orders",orders)
//app.post("/orders",order_search)
app.get("/order_deteils",order_deteils)
app.post("/orders_list",orders_list)
app.put("/order_status_change",order_status_change)
app.put("/vendor_availability",vendor_availability)

//_______________invoice_list________________________
app.get("/invoice_list",invoice_list)
app.post("/invoice_search",invoice_search)
app.get("/invoice_details",invoice_details)

//______________vendor_________________

app.get("/vendors",vendors)
// app.post("/vendor_signup",vendor_signup)
// app.post("/vendor_otp_verify",vendor_otp_verify)
// app.post("/vendor_register",vendor_register)
app.post("/vendor_register",upload.array('image',2),vendor_register)
app.put("/vendor_update",upload.array('image',2),vendor_update)

//__________________bulk_upload___________________
app.post("/product_bulk_uploads",imageUpload.single('bulk_xls'),product_bulk_uploads)

//_________________coupons____________
app.get("/coupon",coupon)
//app.post("/coupons_add",coupons_add)
app.post("/coupons_add",upload.single('image'),coupons_add)
app.put("/coupon_update",upload.single('image'),coupon_update)
app.post("/coupons_list",coupons_list)
app.put("/coupons_delete",coupons_delete)

//______________review_____________
app.post("/review_rating",review_rating)
app.put("/review_approved",review_approved)
app.post("/review_list",review_list)
app.get("/review_detaile",review_detaile)
 
//_______________cammplain-&-support___________
app.post("/add_complaint",add_complaint)
app.get("/complaint_details",complaint_details)
app.put("/complaint_update",complaint_update)
app.post("/complaint_search",complaint_search)


//_______________add_wishlist_______________________
app.post("/add_product_wishlist",add_wishlist)
app.put("/remove_product_from_wishlist",remove_product_from_wishlist)


app.post("/transaction",payment)
app.post("/transaction_list",transaction_list)
app.get("/transaction_details",transaction_details)
app.get("/transaction_details",transaction_details)



//___________________invalid_url_error_______________
app.get("*", function(req, res){
  res.send({"Error":"invalid url"})
  })

//----------------app--listen--------------
var PORT =0
SERVER_PORT == undefined || SERVER_PORT =='' ? PORT = 5000: PORT = SERVER_PORT;

app.listen(PORT, () => {
  console.log(`Server is running on port ${SERVER_PORT}.`);
});

