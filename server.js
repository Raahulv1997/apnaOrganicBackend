const connection = require('./db')
const express = require("express");
const multer  = require('multer');
const formidable = require('formidable');
const path  = require('path');
const fs  = require('fs');
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
var jwt = require('jsonwebtoken');
require('dotenv').config();
const SERVER_PORT = process.env.SERVER_PORT
const USER_JWT_SECRET_KEY =   process.env.USER_JWT_SECRET_KEY

const {fetchuser} = require("./routes/middleware/auth_by_token.js")
const {category,add_category,update_category,delete_category,search_category,get_all_category,category_details} = require("./routes/category.js")
const {products_search,productpost,products_varient_update,products_update,products_delete_remove,products_varient_add,products_pricing,product,product_images,product_status_update,product_images_get_all_veriant,product_images_get_singal_veriant,product_image_delete,change_porduct_cover_image} = require("./routes/product.js")
const {signup,otp_verify,user_register,user_details,user_login,change_user_password,user_forgot_password} = require("./routes/auth.js")
const {add_to_cart,cart, cart_update,remove_cart,cart_list} = require("./routes/cart.js")
const {admin_login,update_password,admin_forgot_password,update_admin,add_admin,admin_search,admin,vendor_availability,vendor_requests,brand_list} = require("./routes/admin.js")
const {orders,order_deteils,orders_list,order_status_change,users_orders} = require("./routes/orders.js")
const {invoice_list,invoice_search,invoice_details} = require("./routes/invoice_list.js")
const {vendors,vendor_register,vendor_list,vendor_update,content_manager,vendor_documents_upload,vendor_documents_get,vendor_document_delete,vendor_status_change,vendor_signup, vendor_otp_verify,vendor_login,change_vendor_password,vendor_forgot_password} = require("./routes/vendor.js")
// const {vendors,vendor_signup,vendor_otp_verify,vendor_register,vendor_list,vendor_update} = require("./routes/vendor")
const {product_bulk_uploads} = require("./routes/product_bulk_uploads.js")
const {coupon,coupons_add,coupon_update,coupons_list,coupons_delete} = require("./routes/coupons")
const {review_rating,review_approved,review_list,review_detaile,ratings_review_get} = require("./routes/review")
const {add_complaint,complaint_details,complaint_update,complaint_search} = require("./routes/complaint")
const {user_products_search} = require("./routes/user.js")
const {add_wishlist,remove_product_from_wishlist,wishlist} = require("./routes/wishlist.js")
const {payment,transaction_list,transaction_details} = require("./routes/transaction.js")
const {revenue,orders_report,products_report,coupons_report,categories_report,stock_report,customers_report,taxes_report} = require("./routes/reoprt.js")
const {trending_product} = require("./routes/trending_product.js")
const {latest_product } = require("./routes/latest_product.js")
const {add_blog,blogs,update_blog,update_blog_status,delete_blog} = require("./routes/blog.js")
const {publish_blog} = require("./routes/cron_.js")
const {add_banner,update_banner,banner_list,banner_delete,cahange_banner_status} = require("./routes/banner.js")
const {add_email_template,update_email_template,email_template_list,email_template_remove,email_template_status,email_template_get} = require("./routes/email_template")
const {add_notification_template ,update_notification_template,notification_template_list,notification_template_remove,notification_template_status,notification_template_get} = require("./routes/notification_template")
const {add_fetured_product,update_fetured_product,featured_list}=require("./routes/fetured_product.js")
const {notification}=require("./routes/notification.js")



//__________+++___________testing______________+++_______________
// const {multer_image} = require("./routes/testxl.js")
const {gmail_send} = require("./routes/gmail_send")


var corsOptions = {
  origin: "http://localhost:3000"
};

app.use(cors(corsOptions));
app.use(express.json({limit: '90mb'}));
app.use(express.static('public'))


app.use(bodyParser.urlencoded({limit: "90mb", extended: true, parameterLimit:50000}));
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
   
// const nDate = new Date().toLocaleString('en-US', {
//   timeZone: 'Asia/Calcutta'
// });

// //console.log(nDate);


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
app.put("/products_delete_remove",products_delete_remove)
app.post("/products_varient_add",products_varient_add)
app.get("/product_details",product)
app.get("/products_pricing",products_pricing)
app.put("/product_status_update",product_status_update)
app.post("/product_images",product_images)
app.get("/product_images_get_all_veriant",product_images_get_all_veriant)
app.get("/product_images_get_singal_veriant",product_images_get_singal_veriant)
app.put("/product_image_delete",product_image_delete)
app.put("/change_porduct_cover_image",change_porduct_cover_image)
//________________user-sign-up_______________________
app.post("/sign_up",signup)
app.post("/otp_verification",otp_verify)
app.post("/user_register",fetchuser,user_register)
app.post("/user_details",fetchuser,user_details)
app.post("/home",(req,res,next)=>{
  if('user_token' in req.headers){
    var token_user = req.headers.user_token
    try {
        const data = jwt.verify(token_user, USER_JWT_SECRET_KEY);
        req.user = data.id;
        next();
    } catch (error) {
        res.status(401).send({ error: "Please authenticate using a valid token" })
    }
  }else{
    user_products_search
    req.user=""
    next()
  }
},user_products_search)

//app.post("/apna_organic_home",apna_organic_home)
app.post("/user_login",user_login)
app.post("/change_user_password",change_user_password)
app.post("/user_forgot_password",user_forgot_password)

//_____________________cart__________________________
app.post("/add_to_cart",fetchuser,add_to_cart)
app.put("/cart",fetchuser,cart)
app.put("/remove_product_from_cart",fetchuser,remove_cart)
app.put("/cart_update",fetchuser,cart_update)
app.get("/user_cart_list",cart_list)
//_________________admin_login_______________________
app.post("/admin_login", admin_login)
app.put("/update_password",update_password)
app.put ("/admin_forget_password",admin_forgot_password)
app.put("/update_admin",update_admin)
app.post("/add_admin",add_admin)
app.post("/admin_search",admin_search)
app.get("/admin", admin)
app.get("/vendor_requests", vendor_requests)
app.post("/vendor_list",vendor_list)
app.get("/brand_list", brand_list)
//________________order______________________________
app.post("/orders",fetchuser,orders)
//app.post("/orders",order_search)
app.post("/order_deteils",fetchuser,order_deteils)
app.post("/orders_list",fetchuser,orders_list)
app.put("/order_status_change",fetchuser,order_status_change)
app.put("/vendor_availability",vendor_availability)
app.get("/user_orders",fetchuser,users_orders)
//_______________invoice_list________________________
app.get("/invoice_list",invoice_list)
app.post("/invoice_search",invoice_search)
app.get("/invoice_details",invoice_details)

//______________vendor____________________
app.post("/vendors",fetchuser,vendors)
app.post("/vendor_signup",vendor_signup)
app.post("/vendor_otp_verify",vendor_otp_verify)
app.post("/vendor_login",vendor_login)
app.post("/change_vendor_password",change_vendor_password)

// app.post("/vendor_register",vendor_register)
app.post("/vendor_register",upload.single('image'),vendor_register)
app.put("/vendor_update",upload.single('image'),vendor_update)
//app.put("/vendor_status_change",vendor_status_change)
app.put("/content_manager",content_manager)
app.post("/vendor_documents_upload",vendor_documents_upload)
app.get("/vendor_documents_get",vendor_documents_get)
app.put("/vendor_document_delete",vendor_document_delete)
app.put("/vendor_status_change",vendor_status_change)
app.post("/vendor_forgot_password",vendor_forgot_password)

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
app.post("/ratings_review_get",ratings_review_get)
 
//_______________cammplain-&-support___________
app.post("/add_complaint",fetchuser,add_complaint)
app.get("/complaint_details",complaint_details)
app.put("/complaint_update",fetchuser,complaint_update)
app.post("/complaint_search",fetchuser,complaint_search)


//_______________add_wishlist_______________________
app.post("/add_product_wishlist", fetchuser,add_wishlist)
app.put("/remove_product_from_wishlist", fetchuser,remove_product_from_wishlist)
app.post("/wishlist",fetchuser,wishlist)


app.post("/transaction",payment)
app.post("/transaction_list",transaction_list)
app.get("/transaction_details",transaction_details)
//app.get("/transaction_details",transaction_details)

//________________reports___________________________
app.post("/revenue",revenue)
app.post("/orders_report",orders_report)
app.post("/products_report",products_report)
app.post("/coupons_report",coupons_report)
app.post("/categories_report",categories_report)
app.post("/stock_report",stock_report)
app.post("/customers_report",customers_report)
app.post("/taxes_report",taxes_report)

//_______________Featured_product________
app.get("/trending_product",trending_product)

//_____________Trending_product_____________
app.get("/latest_product",latest_product)

//_____________blog_______________________________________
app.post("/add_blog",upload.single('image'),add_blog)
app.post("/blogs",blogs)
app.put("/update_blog",upload.single('image'),update_blog)
app.put("/update_blog_status",update_blog_status)
app.put("/delete_blog",delete_blog)

//_____________banner______________________________________
app.post("/add_banner",upload.single('image'),add_banner)
app.put("/update_banner",upload.single('image'),update_banner)
app.post("/banner_list",banner_list)
app.put("/banner_delete",banner_delete)
app.put("/cahange_banner_status",cahange_banner_status)

  //_________gmail_send________
  app.post("/gmail_send",gmail_send)


//___________________Email_Template_______________
app.post("/add_email_template",add_email_template)
app.put("/update_email_template",update_email_template)
app.post("/email_template_list",email_template_list)
app.put("/email_template_remove",email_template_remove)
app.put("/email_template_status",email_template_status)
app.get("/email_template_get",email_template_get)


//___________________fetured_product____________________
app.post("/add_fetured_product",add_fetured_product)
app.put("/update_fetured_product",update_fetured_product)
app.post("/featured_list",featured_list)
//app.post("/featured_list",featured_list)



//_____________notification_template_______________
app.post("/add_notification_template",add_notification_template)
app.put("/update_notification_template",update_notification_template)
app.post("/notification_template_list",notification_template_list)
app.put("/notification_template_remove",notification_template_remove)
app.put("/notification_template_status",notification_template_status)
app.get("/notification_template_get",notification_template_get)

//_____________notification_- user_&_vendor_&_admin - __________
app.post("/notification",notification)

//___________________invalid_url_error____________________
app.get("*", function(req, res){
  res.send({"Error":"invalid url"})
  })




//__________+++___________testing______________+++_________
//app.post("/multer_image",multer_image)
// app.post('/multer_image', (req, res, next) => {
//   //console.log("form___________")

//   const form = formidable({ multiples: true });

//   form.parse(req, (err, fields, files) => {
//     if (err) {
//       next(err);
//       return;
//     }
//     res.json(files);
//   })


//--------------------------------------------------

//   const form = new formidable.IncomingForm();
//   //console.log(form)
//   form.parse(req, function(err, fields, file){
//       var oldPath = file.image.path;
//       //console.log("oldPath_______")
//       //console.log(oldPath)

//       var newPath = path.join(__dirname,'/apna_backend/public/catgory_images')+ '/'+files.image.name
//       //console.log("newPath________")
//       //console.log(newPath)
//       var rawData = fs.readFileSync(oldPath)
//       //console.log(newPath)
      
//       fs.writeFile(newPath, rawData, function(err){
//           if(err) //console.log(err)
//           return res.send("Successfully uploaded")
//       })
// })
 //});

//----------------app--listen--------------
var PORT =0
SERVER_PORT == undefined || SERVER_PORT =='' ? PORT = 5000: PORT = SERVER_PORT;

app.listen(PORT, () => {
  //console.log(`Server is running on port ${SERVER_PORT}.`);
  //____________________node-cron-function_______________________________________
  publish_blog()
});

// const filePath = path.join(__dirname,'/apna_backend/public/catgory_images' );
// //console.log(filePath)