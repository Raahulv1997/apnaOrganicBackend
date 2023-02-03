const connection = require('../db')
const reader = require('xlsx');
const path = require('path');
const fs = require('fs');


// var x = 0;

// function go() {
//     //console.log("gg"+x)
//     if (x++ < 20) {
//         setTimeout(go, 2000);
//     }
// }
// go();




 function product_bulk_uploads(req, res) {
  var product_code_arr = []
    //console.log("product_bulk_uploads")
    var p_id =0
    if (req.file == undefined || req.file == '') {
        fname = "no image"
    } else {
        var fname = "public/bulk_upload_xls/" + req.file.filename;
        //console.log(fname)
       
        const file = reader.readFile(fname)
        const sheets = file.SheetNames;
        //console.log("_______line_no._19__________")
        //console.log(sheets.length)

            //console.log("count_j" + 0 + "slength" + sheets.length)
            const temp = reader.utils.sheet_to_json(
            file.Sheets[file.SheetNames[0]]);

            var add_custom_input1 = JSON.stringify(temp[0].add_custom_input)
            var x = 0;
            function go(){
              //console.log("gg"+x)
              var item = temp[x]
              if(product_code_arr.includes(item.product_code)){
                console.log("item________________product____line_no._45")
                console.log(item)
                //console.log("add product_pricing___2");
                connection.query('INSERT INTO `products_pricing`(`product_id`, `colors`, `size`, `mrp`, `product_price`, `sale_price`, `discount`, `manufacturing_date`, `expire_date`, `special_offer`, `featured_product`, `unit`, `unit_quantity`, `quantity`,`product_status`) VALUES (' + p_id + ',"' + item.colors + '","' + item.size + '",' + item.mrp + ',' + item.product_price + ',' + item.sale_price + ',' + item.discount + ',"'+ item.manufacturing_date + '","' + item.expire_date + '",' + item.special_offer + ',' + item.featured_product + ',"' + item.unit + '","'+	item.unit_quantity+'",'+ item.quantity +',"'+item.product_status+'")', (err, rows, fields) => {
                  if (err) {
                    console.log("/_products_post_error_line_no.48" + err)
                    //res.send(err)
                  } else {
                    if(rows!=''){
                        //console.log("successfully_added_data_on_price_table1 "+ item.colors+" == "+p_id)
                       // res.send({"message":"succesfully added data on product table"})
                    }else{
                      //console.log("not_added_data_on_price_table")
                    }
                    
                  }
                });
              }else{
                //console.log("add product with common deteils___1")
                console.log("INSERT INTO `products`(`product_title_name`, `product_slug`, `store_name`, `product_description`, `product_type`, `brand`, `category`, `parent_category`, `seo_tag`, `other_introduction`, `add_custom_input`, `wholesale_sales_tax`, `manufacturers_sales_tax`, `retails_sales_tax`, `gst`, `cgst`, `sgst`, `value_added_tax`, `variety`, `vendor_id`, `shop`) VALUES ('" + item.product_title_name + "','" + item.product_slug + "','" + item.store_name + "','" + item.product_description + "','" + item.product_type + "','"+item.brand+"','" + item.category + "','" + item.parent_category + "','" + item.seo_tag + "','" + item.other_introduction + "','"+ add_custom_input1 + "','"+item.wholesale_sales_tax+"','"+item.manufacturers_sales_tax+"','"+item.retails_sales_tax+"','"+item.gst+"','"+item.cgst+"','"+item.sgst+"','"+item.value_added_tax+"',"+item.variety+",'"+item.vendor_id+"','"+item.shop+"')")
                product_code_arr.push(item.product_code)
                 connection.query("INSERT INTO `products`(`product_title_name`, `product_slug`, `store_name`, `product_description`, `product_type`, `brand`, `category`, `parent_category`, `seo_tag`, `other_introduction`, `add_custom_input`, `wholesale_sales_tax`, `manufacturers_sales_tax`, `retails_sales_tax`, `gst`, `cgst`, `sgst`, `value_added_tax`, `variety`, `vendor_id`, `shop`) VALUES ('" + item.product_title_name + "','" + item.product_slug + "','" + item.store_name + "','" + item.product_description + "','" + item.product_type + "','"+item.brand+"','" + item.category + "','" + item.parent_category + "','" + item.seo_tag + "','" + item.other_introduction + "','"+ add_custom_input1 + "','"+item.wholesale_sales_tax+"','"+item.manufacturers_sales_tax+"','"+item.retails_sales_tax+"','"+item.gst+"','"+item.cgst+"','"+item.sgst+"','"+item.value_added_tax+"',"+item.variety+",'"+item.vendor_id+"','"+item.shop+"')", (err, rows, fields) => {
                  if (err) {
                    console.log("/_products_post_error_line_no.66" + err)
                    //res.send(err)
                  } else {
                    console.log("rows__line_no._69")
                    console.log(rows)
                    product_code_arr.push(item.product_code)
                    p_id = JSON.parse(rows.insertId)
                    //console.log("p_id______"+p_id)
                      //console.log("successfully_add_data_on_new_products")

                      connection.query('INSERT INTO `products_pricing`(`product_id`, `colors`, `size`, `mrp`, `product_price`, `sale_price`, `discount`, `manufacturing_date`, `expire_date`, `special_offer`, `featured_product`, `unit`, `unit_quantity`, `quantity`,`product_status`) VALUES (' + p_id + ',"' + item.colors + '","' + item.size + '",' + item.mrp + ',' + item.product_price + ',' + item.sale_price + ',' + item.discount + ',"'+ item.manufacturing_date + '","' + item.expire_date + '",' + item.special_offer + ',' + item.featured_product + ',"' + item.unit + '","'+	item.unit_quantity+'",'+ item.quantity +',"'+item.product_status+'")', (err, rows, fields) => {
                        //console.log(JSON.stringify(rows));
                        if (err) {
                          console.log("/_products_pricing_error_line_no.76" + err)
                          //res.send(err)
                        } else {
                          if(rows!=''){
                              console.log("successfully_added_data_on_price_table")
                             // res.send({"message":"succesfully added data on product table"})
                          }
                          
                        }
                      });
                    
                  }
                })
              }

    if (x++ < temp.length-1){
      setTimeout(go, 300);
  }else{
    console.log("Succesfully Added "+x+" Products")
    res.send("Succesfully Added "+x+" Products")
  }
}

go()
  }}
module.exports = { product_bulk_uploads }