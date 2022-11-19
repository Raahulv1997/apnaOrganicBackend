const connection = require('../db')

function products_search(req, res) {
  var condition_flag = true;
  console.log("in product");
  //console.log(req.query.keydk)
  var greeting = req.body
  console.log( greeting)
var pg = req.query
console.log(pg)


  var newstr = 'SELECT * from products_view WHERE '
  var catobj = greeting[0]
  var onjkayarrry =Object.keys(catobj)
  var onjvaluarrry =Object.values(catobj)
  console.log(onjkayarrry)
  console.log(onjvaluarrry)
  
  for(var i=0;i<=onjkayarrry.length-1;i++){

    if(onjvaluarrry[i]!=''){
       condition_flag = false;
      if(onjkayarrry.length-1 == i){
        newstr += onjkayarrry[i]+ '=' + '"' + onjvaluarrry[i] + '"' 
      }else{
        newstr += onjkayarrry[i]+ '=' + '"' + onjvaluarrry[i]+'"'+'___'
      }
    }
    
  } 
  if(condition_flag){
    connection.query('SELECT * FROM `products_view` WHERE 1',(err,result)=>{
      if(err){
        console.log("/_products_error"+err)
        res.send(err)
      }else{
        console.log(result)
        res.send(result)
        //res.json(result)
      }
    });
  }else{
    var qry = newstr.replace(/___/g,' AND ')
    console.log(typeof qry)
    console.log(qry)
    connection.query(qry,(err,result)=>{
      if(err){
        console.log("/_products_error"+err)
        res.send(err)
      }else{
        console.log(result)
        res.send(result)
        //res.json(result)
      }
    });
  }
  
}


function productpost(req, res) {
  console.log("---post---product--")
  var postdata = req.body
  var product_catagory = postdata[0].price
  console.log(product_catagory)

  var { product_title_name, product_slug, store_name, product_description, product_type, category, parent_category, seo_tag, other_introduction, add_custom_input, id } = postdata[0]
  console.log(product_title_name)
  
  connection.query('INSERT INTO `products`(`product_title_name`, `product_slug`, `store_name`, `product_description`, `product_type`, `category`, `parent_category`,`seo_tag`, `other_introduction`, `add_custom_input`) VALUES ("' + product_title_name + '","' + product_slug + '","' + store_name + '","' + product_description + '","' + product_type + '","' + category + '","' + parent_category + '","' + seo_tag + '","' + other_introduction + '","' + add_custom_input + '")', (err, rows, fields) => {
    if (err) {
      console.log("/_products_post_error" + err)
      res.send(err)
    } else {
      
      var p_id = JSON.parse(rows.insertId)
      res.send({"message":"succesfully added data on new_product table"})
      console.log("successfully_add_data_on_new_products")
      product_catagory.forEach((item, index) => {
        console.log(index)

        connection.query('INSERT INTO `products_pricing`(`product_id`,`colors`, `size`, `mrp`, `product_price`, `sale_price`, `discount`,`wholesale_sales_tax`, `manufacturers_sales_tax`, `retails_sales_tax`,`gst`,`value_added_tax`,`manufacturing_date`,`expire_date`,`special_offer`,`featured_product`,`unit`,`quantity`) VALUES (' + p_id + ',"' + item.colors + '","' + item.size + '",' + item.mrp + ',' + item.product_price + ',' + item.sale_price + ',' + item.discount + ',' + item.wholesale_sales_tax + ',' + item.manufacturers_sales_tax + ',' + item.retails_sales_tax + ',' + item.gst + ',' + item.value_added_tax + ',"' + item.manufacturing_date + '","' + item.expire_date + '",' + item.special_offer + ',"' + item.featured_product + '","' + item.unit + '",' + item.quantity + ')', (err, rows, fields) => {
          if (err) {
            console.log("/_products_post_error" + err)
            res.send(err)
          } else {
            console.log("successfully_added_data_on_price_table")

          }
        });
      });
    }
  })
}

module.exports = { products_search, productpost };