const connection = require('../db')
const reader = require('xlsx');
const path = require('path');
const fs = require('fs');

function product_bulk_uploads(req, res) {
    console.log("product_bulk_uploads")

    if (req.file == undefined || req.file == '') {
        fname = "no image"
    } else {
        var fname = "public/bulk_upload_xls/" + req.file.filename;
        console.log(fname)
       


        const file = reader.readFile(fname)
        const sheets = file.SheetNames;
        console.log("_______line_no._19__________")
        console.log(sheets.length)
        //for (let j = 0; j < 3; j++) {
            console.log("count_j" + 0 + "slength" + sheets.length)
            const temp = reader.utils.sheet_to_json(
                file.Sheets[file.SheetNames[0]]);
            console.log("______________temp-25-----------------------")
            console.log(temp)
            //console.log(temp[j])
            var add_custom_input1 = JSON.stringify(temp[0].add_custom_input)
            temp.forEach((item)=>{
                connection.query("INSERT INTO `products`(`product_title_name`, `product_slug`, `store_name`, `product_description`, `product_type`, `brand`, `category`, `parent_category`, `seo_tag`, `other_introduction`, `add_custom_input`, `wholesale_sales_tax`, `manufacturers_sales_tax`, `retails_sales_tax`, `gst`, `value_added_tax`, `variety`) VALUES ('" + item.product_title_name + "','" + item.product_slug + "','" + item.store_name + "','" + item.product_description + "','" + item.product_type + "','"+item.brand+"','" + item.category + "','" + item.parent_category + "','" + item.seo_tag + "','" + item.other_introduction + "','"+ add_custom_input1 + "','"+item.wholesale_sales_tax+"','"+item.manufacturers_sales_tax+"','"+item.retails_sales_tax+"','"+item.gst+"','"+item.value_added_tax+"',"+item.variety+")", (err, rows, fields) => {
                    if (err) {
                      console.log("/_products_post_error" + err)
                      //res.send(err)
                    } else {
                        console.log("_______line_no._34__________")
                      var p_id = JSON.parse(rows.insertId)
                      console.log("p_id______"+p_id)
                      
                      console.log("successfully_add_data_on_new_products")
                        connection.query('INSERT INTO `products_pricing`(`product_id`, `colors`, `size`, `mrp`, `product_price`, `sale_price`, `discount`, `manufacturing_date`, `expire_date`, `special_offer`, `featured_product`, `unit`, `unit_quantity`, `quantity`,`product_status`) VALUES (' + p_id + ',"' + item.colors + '","' + item.size + '",' + item.mrp + ',' + item.product_price + ',' + item.sale_price + ',' + item.discount + ',"'+ item.manufacturing_date + '","' + item.expire_date + '",' + item.special_offer + ',' + item.featured_product + ',"' + item.unit + '","'+	item.unit_quantity+'",'+ item.quantity +',"'+item.product_status+'")', (err, rows, fields) => {
                          if (err) {
                            console.log("/_products_post_error" + err)
                            //res.send(err)
                          } else {
                            if(rows!=''){
                                console.log("_______line_no._45__________")
                                console.log("successfully_added_data_on_price_table")
                               // res.send({"message":"succesfully added data on product table"})
                            }
                            
                          }
                        });
                      
                    }
                  })
            })
            

        //}
    }

    // connection.query('INSERT INTO `category`(`parent_id`,`all_parent_id`,`level`,`category_name`,`category_type`,`image`,`is_active`) VALUES ('+parent_id+',"'+all_parent_id+'",'+parseInt(level+1)+',"'+new_category+'","'+category_type+'","'+image+'",'+0+')',(err,rows,fields)=>{
    //   if(err){
    //     console.log("/category_error"+err)
    //     res.send(err)
    //   }else{
    //     console.log(rows)
    //     res.send(rows)
    //   }
    // }) 
}
module.exports = { product_bulk_uploads }