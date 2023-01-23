const connection = require('../db')
// const reader = require('xlsx');
// const path = require('path');
// const fs = require('fs');

// function test(){
// //console.log("tset chk")
// const file = reader.readFile('../routes/agw.xls')
//           const sheets = file.SheetNames; 
//           //console.log(sheets)
//           for (let j = 0; j < sheets.length; j++) {
//             //console.log("count_j"+j+"slength"+sheets.length)
//               const temp = reader.utils.sheet_to_json(
//                   file.Sheets[file.SheetNames[j]]);
//                   //console.log("temp------------------------")
//                   //console.log(temp)
//    }
// }
// test()


//{id,user_id,product_id,product_title_name,product_slug,store_name, product_description,product_type,brand, category, parent_category, seo_tag,other_introduction, wholesale_sales_tax, manufacturers_sales_tax,retails_sales_tax, gst, cgst, sgst,value_added_tax,variety,vendor_id,shop, rating,colors,size, mrp, product_price,sale_price, discount, manufacturing_date,special_offer, featured_product,expire_date,unit,unit_quantity,is_delete,product_status}

// const elements = ['Fire', 'Air', 'Water'];
// var str =''
// var ccc=true
// //console.log("kkkkkkkkkkkkkkkkkkkkkkkk")
// elements.forEach((ind,item)=>{if(ccc){str += "'"+item+"'";ccc=false}else{str += ",'"+item+"'"};})
// //console.log(str)

// (`created_on` BETWEEN '" + req.body.from_date + " 24:00:00' AND '" + req.body.to_date + " 23:59:59') AND (NOT `status` = 'return')
//SELECT * FROM `orders_view` WHERE parent_category = '5,18' AND (`created_on` BETWEEN   '2022-11-28 24:00:00' AND '2022-11-29 23:59:59')


// cron.schedule('0 0 */12 * * *', function(){
//     //console.log('running a task every twelve hours');
//   });

//____________________try_1________
// var cron = require('node-cron');
// //console.log("node-cron-fun")
// cron.schedule(' 21 12 * * *', () => {
//     //console.log('node-cron-test');
//   });

//____________________try_2________
  //const schedule = require('node-schedule');
 // var schedule = require('node-schedule-tz');
//  var date = new Date(2022, 12, 26, 12, 26, 0);
// const date = new Date(2022, 12, 26, 12, 28, 0).toLocaleString('en-US', { timeZone: 'Asia/Kolkata'});
//   //console.log(date)
// const str = new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata'});
// //console.log(str);
//   var j = schedule.scheduleJob(str,'Asia/Kolkata',function(){
//     //console.log('job is running');
//     //console.log(j)
//   });

// var schedule = require('node-schedule');
// var date = new Date(2022, 11, 27, 16, 52, 0);
// //console.log(date)
// var j = schedule.scheduleJob(date, function(){
//   //console.log('job is running');

// })
// //console.log(j)
//____________________try_3________________
//var CronJob = require('cron').CronJob;
// var job = new CronJob('0 40 11 * * *', function() {
//     //will run every day at 12:00 AM
//     //console.log(" run every day at 12:00 AM")
//    })
// var job = new CronJob(
// 	'0 41 11 * * *',
// 	function() {
// 		//console.log('You will see this message every second');
// 	},
// 	null,
// 	true,
// 	'Asia/Kolkata'
// );
//___________________________________________________________mult_image
// const connection = require('../db')
// function multer_image(req,res){
//   //console.log("test image______")
//   //console.log(req.body.name)
//   //console.log(req.files)
//   if(req.files == undefined || req.files == '' ){
//     image="no image"
//     res.send(image)
//   }else{
//     var image = "public/catgory_images/"+req.file[0].filename;
//     //console.log(image)
//     res.send(image)
//   }
//   //  var documents1 = JSON.stringify("public/catgory_images/"+req.files[1].filename)
//   // // var logo = JSON.stringify("public/catgory_images/"+req.files[2].filename)
//   //  //console.log(documents1)
// }
//module.exports={multer_image}

//_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-
//_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_base64__to__image-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-


const fs  = require('fs');
//var imgBase64 = ''




function multer_image(req,res){
  ////console.log("req.body")
  var base64_type=req.body.product_images
  //console.log(base64_type)
  base64_type.forEach((item,ind) => {
    var imgBase64 = item.img_64
    //console.log(item.img_64)
    var base64Data = imgBase64.replace("data:image/png;base64,", "");
    // Store Image into Server
    fs.writeFile("/home/we2code/Desktop/apna backend 19Nov/apna_backend/public/products_images/"+"image"+ind+".png", base64Data, 'base64', function(err) {
      if(null){
        //console.log("Image Saved Successfully."); 
      }else{
        //console.log(err); 
      }
    });
  });
}
module.exports={multer_image}