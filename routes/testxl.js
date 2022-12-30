// const connection = require('../db')
// const reader = require('xlsx');
// const path = require('path');
// const fs = require('fs');

// function test(){
// console.log("tset chk")
// const file = reader.readFile('../routes/agw.xls')
//           const sheets = file.SheetNames; 
//           console.log(sheets)
//           for (let j = 0; j < sheets.length; j++) {
//             console.log("count_j"+j+"slength"+sheets.length)
//               const temp = reader.utils.sheet_to_json(
//                   file.Sheets[file.SheetNames[j]]);
//                   console.log("temp------------------------")
//                   console.log(temp)
//    }
// }
// test()


//{id,user_id,product_id,product_title_name,product_slug,store_name, product_description,product_type,brand, category, parent_category, seo_tag,other_introduction, wholesale_sales_tax, manufacturers_sales_tax,retails_sales_tax, gst, cgst, sgst,value_added_tax,variety,vendor_id,shop, rating,colors,size, mrp, product_price,sale_price, discount, manufacturing_date,special_offer, featured_product,expire_date,unit,unit_quantity,is_delete,product_status}

// const elements = ['Fire', 'Air', 'Water'];
// var str =''
// var ccc=true
// console.log("kkkkkkkkkkkkkkkkkkkkkkkk")
// elements.forEach((ind,item)=>{if(ccc){str += "'"+item+"'";ccc=false}else{str += ",'"+item+"'"};})
// console.log(str)

// (`created_on` BETWEEN '" + req.body.from_date + " 24:00:00' AND '" + req.body.to_date + " 23:59:59') AND (NOT `status` = 'return')
//SELECT * FROM `orders_view` WHERE parent_category = '5,18' AND (`created_on` BETWEEN   '2022-11-28 24:00:00' AND '2022-11-29 23:59:59')


// cron.schedule('0 0 */12 * * *', function(){
//     console.log('running a task every twelve hours');
//   });

//____________________try_1________
// var cron = require('node-cron');
// console.log("node-cron-fun")
// cron.schedule(' 21 12 * * *', () => {
//     console.log('node-cron-test');
//   });

//____________________try_2________
  //const schedule = require('node-schedule');
 // var schedule = require('node-schedule-tz');
//  var date = new Date(2022, 12, 26, 12, 26, 0);
// const date = new Date(2022, 12, 26, 12, 28, 0).toLocaleString('en-US', { timeZone: 'Asia/Kolkata'});
//   console.log(date)
// const str = new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata'});
// console.log(str);
//   var j = schedule.scheduleJob(str,'Asia/Kolkata',function(){
//     console.log('job is running');
//     console.log(j)
//   });

// var schedule = require('node-schedule');
// var date = new Date(2022, 11, 27, 16, 52, 0);
// console.log(date)
// var j = schedule.scheduleJob(date, function(){
//   console.log('job is running');

// })
// console.log(j)
//____________________try_3________________
//var CronJob = require('cron').CronJob;
// var job = new CronJob('0 40 11 * * *', function() {
//     //will run every day at 12:00 AM
//     console.log(" run every day at 12:00 AM")
//    })
// var job = new CronJob(
// 	'0 41 11 * * *',
// 	function() {
// 		console.log('You will see this message every second');
// 	},
// 	null,
// 	true,
// 	'Asia/Kolkata'
// );
//___________________________________________________________mult_image
// const connection = require('../db')
// function multer_image(req,res){
//   console.log("test image______")
//   console.log(req.body.name)
//   console.log(req.files)
//   if(req.files == undefined || req.files == '' ){
//     image="no image"
//     res.send(image)
//   }else{
//     var image = "public/catgory_images/"+req.file[0].filename;
//     console.log(image)
//     res.send(image)
//   }
//   //  var documents1 = JSON.stringify("public/catgory_images/"+req.files[1].filename)
//   // // var logo = JSON.stringify("public/catgory_images/"+req.files[2].filename)
//   //  console.log(documents1)
// }
//module.exports={multer_image}

//_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-
//_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_base64__to__image-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-


// const fs  = require('fs');
// var imgBase64 = 'data:image/png;base64,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';


// var base64Data = imgBase64.replace("data:image/png;base64,", "");
// // Store Image into Server
// fs.writeFile("/home/we2code/Desktop/apna backend 19Nov/apna_backend/public/products_images/"+"image.png", base64Data, 'base64', function(err) {
//   if(err != null){
//     console.log("Image Saved Successfully."); 
//   }else{
//     console.log(err); 
//   }
// });

