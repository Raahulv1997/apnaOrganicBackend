const connection = require('../db')

 function products_search(req, res) {
  var condition_flag = true;
  console.log("in product");
  //console.log(req.query.keydk)
  var catobj = req.body.product_search
  var srch = catobj.search

  console.log( catobj)
var pg = req.query
console.log(pg)
console.log(srch)
var newstr = 'SELECT * from products_view WHERE '
if(srch != ''){
console.log("trueeeee")
newstr +='(`product_title_name` LIKE "%'+srch+'%" OR `product_description` LIKE "%'+srch+'%" OR `product_type` LIKE "%'+srch+'%") AND '
}else{
  console.log("falseeee")

}
console.log(newstr)

  
  //var catobj = greeting[0]
  var onjkayarrry =Object.keys(catobj)
  var onjvaluarrry =Object.values(catobj)
  // console.log(onjkayarrry)
  // console.log(onjvaluarrry)
  
  for(var i=1;i<=onjkayarrry.length-1;i++){

    if(onjvaluarrry[i]!=''){
       condition_flag = false;
      //  console.log("check_condition_")
      //  console.log(onjkayarrry.length-1+ "__" +i)
      if(onjkayarrry.length-1 == i){
        newstr += ' '+onjkayarrry[i]+ '=' + '"' + onjvaluarrry[i] + '"' 
      }else{
        newstr += ' '+onjkayarrry[i]+ '=' + '"' + onjvaluarrry[i]+'"'+'___'
      }
    }
    
  } 
  if(condition_flag){

    console.log("_______________ressend-1_______________")

    var newqry = 'SELECT * FROM `products_view` WHERE `product_title_name` LIKE "%'+srch+'%" OR `product_description` LIKE "%'+srch+'%" OR `product_type` LIKE "%'+srch+'%" OR `colors` LIKE "%'+srch+'%" '+' '+'LIMIT'
    console.log('newqry-------------------------------------------------')
    console.log(newqry)
    var numRows;
    var queryPagination;
    var numPerPage = 10
    var page = parseInt(pg.page,pg.per_page) || 0;
    var numPages;
    var skip = page * numPerPage;
    // Here we compute the LIMIT parameter for MySQL query
    var limit = skip + ',' + numPerPage;
      
    connection.query('SELECT count(*) as numRows FROM products_view',(err,results)=>{
          if(err){
            console.log("/category_error"+err)
            console.log(err)
            //return err
          }else{
            numRows = results[0].numRows;
            numPages = Math.ceil(numRows / numPerPage);
            console.log('number of pages:', numPages);
            //console.log(''+newqry+' '+limit+'')
            connection.query(''+newqry+' '+limit+'',(err,results)=>{
              if(err){
                console.log(err)
                res.send(err)
              }else{
               // console.log(results)
                var responsePayload = {
                  results: results
                };
                if (page < numPages) {
                  responsePayload.pagination = {
                    current: page,
                    perPage: numPerPage,
                    previous: page > 0 ? page - 1 : undefined,
                    next: page < numPages - 1 ? page + 1 : undefined
                  }
                }
                else responsePayload.pagination = {
                  err: 'queried page ' + page + ' is >= to maximum page number ' + numPages
                }
                console.log("responsePayload++++++++++++++++++++++++++++++++++++++++");
                //console.log(responsePayload);
                res.send(responsePayload)
              }
            })
            
          }
        })
    
    // connection.query('SELECT * FROM `products_view` WHERE 1 ',(err,result)=>{
    //   if(err){
    //     console.log("/_products_error"+err)
    //     res.send(err)
    //   }else{
    //     console.log(result)
    //     res.send(result)
    //     //res.json(result)
    //   }
    // })
  }else{
    var qry = newstr.replace(/___/g,' AND')
var lastCharOfHello=qry.slice(-4);//d
// console.log("lastCharOfHello=========================")
// console.log('f'+lastCharOfHello+'f')

if(lastCharOfHello == " AND"){
var qry = qry.substring(0, qry.lastIndexOf(" "));
  // console.log("and available___"+qry)

}else{
  console.log("no avia")
}


    // console.log(typeof qry)
    // console.log(qry)

     console.log("_______________ressend-2_______________")

     var newqry = qry+' '+'LIMIT'
     console.log('newqry-------------------------------------------------')
     console.log(newqry)
     var numRows;
     var queryPagination;
     var numPerPage = 10
     var page = parseInt(pg.page,pg.per_page) || 0;
     var numPages;
     var skip = page * numPerPage;
     // Here we compute the LIMIT parameter for MySQL query
     var limit = skip + ',' + numPerPage;
       
     connection.query('SELECT count(*) as numRows FROM products_view',(err,results)=>{
           if(err){
             console.log("/category_error"+err)
             console.log(err)
             //return err
           }else{
             numRows = results[0].numRows;
             numPages = Math.ceil(numRows / numPerPage);
             console.log('number of pages:', numPages);
             //console.log(''+newqry+' '+limit+'')
             connection.query(''+newqry+' '+limit+'',(err,results)=>{
               if(err){
                 console.log(err)
                 res.send(err)
               }else{
                // console.log(results)
                 var responsePayload = {
                   results: results
                 };
                 if (page < numPages) {
                   responsePayload.pagination = {
                     current: page,
                     perPage: numPerPage,
                     previous: page > 0 ? page - 1 : undefined,
                     next: page < numPages - 1 ? page + 1 : undefined
                   }
                 }
                 else responsePayload.pagination = {
                   err: 'queried page ' + page + ' is >= to maximum page number ' + numPages
                 }
                 console.log("responsePayload++++++++++++++++++++++++++++++++++++++++");
                 //console.log(responsePayload);
                 res.send(responsePayload)
               }
             })
             
           }
         }) 
    // connection.query(qry,(err,result)=>{
    //   if(err){
    //     console.log("/_products_error"+err)
    //     res.send(err)
    //   }else{
    //     console.log(result)
    //     res.send(result)
    //     //res.json(result)
    //   }
    // });
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

function products_update(req,res){
  var {varient_id,product_id,colors,size,mrp,product_price,sale_price,discount,wholesale_sales_tax,manufacturers_sales_tax,retails_sales_tax,gst,value_added_tax,manufacturing_date,expire_date,special_offer,featured_product,unit,quantity}=req.body
  console.log(req.body)
  connection.query('UPDATE products_pricing SET colors="'+colors+'",size="'+size+'",mrp='+mrp+',product_price='+product_price+',sale_price='+sale_price+',discount='+discount+',wholesale_sales_tax='+wholesale_sales_tax+',manufacturers_sales_tax='+manufacturers_sales_tax+',retails_sales_tax='+retails_sales_tax+',gst='+gst+',value_added_tax='+value_added_tax+',manufacturing_date="'+manufacturing_date+'",expire_date="'+expire_date+'",special_offer='+special_offer+',featured_product="'+featured_product+'",unit="'+unit+'",quantity='+quantity+' WHERE id='+varient_id+' AND product_id='+product_id+'', (err, rows, fields) => {
    if (err) {
      console.log("/products_update" + err)
      res.send(err)
    } else {
      console.log("successfully_updated_data_on_price_table")
      res.send(rows)
    }
  })
}

module.exports = { products_search, productpost,products_update };