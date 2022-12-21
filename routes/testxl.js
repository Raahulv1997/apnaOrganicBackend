// const connection = require('../db')
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