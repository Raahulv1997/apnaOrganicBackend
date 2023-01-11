const connection = require('../db')
function user_products_search(req, res) {

  //SELECT *, (SELECT id FROM wishlist WHERE wishlist.product_id = products_view.product_id) as wishlist FROM products_view

//   connection.query("SELECT *, (SELECT id FROM wishlist WHERE wishlist.product_id = products_view.product_id AND user_id = "+req.body.user_id+") as wishlist FROM products_view WHERE is_delete ='1'",(err,results)=>{
//     if(err){
//       console.log(err)
//       res.status(502).send(err)
//     }else{
//      //console.log("_____")
//      results!=''?res.status(200).send(results):res.status(200).send("invalid input data ")
     
//     }
// })
// return false
console.log(req.query.user_id)
var u_id = req.query.user_id
if(u_id!==''){
  if(u_id != undefined){
    var condition_flag = true;
    console.log("in product");
    //console.log(req.query.keydk)
    var catobj = req.body.product_search
    var srch = catobj.search
    var price_to=catobj.price_to;
    var price_from=catobj.price_from;
    console.log(price_to)
    console.log(price_from)
  console.log( catobj)
  var pg = req.query
  console.log(pg)
  console.log(srch)
  var newstr = 'SELECT *, (SELECT id FROM wishlist WHERE wishlist.product_id = products_view.id AND user_id = "'+req.query.user_id+'") as wishlist, (SELECT is_deleted FROM fetured_product_table WHERE fetured_product_table.product_id = products_view.product_id AND fetured_product_table.start_date < NOW() AND fetured_product_table.end_date > NOW() ) as is_fetured_product FROM products_view WHERE is_delete = "1" AND '
  if(srch != ''){
  console.log("trueeeee")
  newstr +='(`product_title_name` LIKE "%'+srch+'%" OR `product_description` LIKE "%'+srch+'%" OR `product_type` LIKE "%'+srch+'%") AND '
  }else{
    console.log("falseeee")
  
  }
  if (price_to != '' && price_from !='' && srch != '' ) {
    //console.log("trueeeee")
    newstr += '(`sale_price` BETWEEN "'+price_from+'" AND "'+price_to+'") AND'
    condition_flag = false;
  } else {
    if(price_to != '' && price_from !=''){
      newstr += '(`sale_price` BETWEEN "'+price_from+'" AND "'+price_to+'") '
      condition_flag = false;  
    }

  }
    var onjkayarrry =Object.keys(catobj)
    var onjvaluarrry =Object.values(catobj)
  
    for(var i=3;i<=onjkayarrry.length-1;i++){
  
      if(onjvaluarrry[i]!=''){
         condition_flag = false;
         if(price_to != '' && price_from !='' && srch ==''){
          newstr += ' AND'
        }
        if(onjkayarrry.length-1 == i){
        var arr = JSON.stringify(onjvaluarrry[i]);
        var abc="'"+arr+"'"
        const id = abc.substring(abc.lastIndexOf("'[") + 2, abc.indexOf("]'"));
        newstr += ' ' + onjkayarrry[i] + ' IN ' + '(' + id + ')' 
        }else{
        console.log(onjvaluarrry[i])
        var arr = JSON.stringify(onjvaluarrry[i]);
        var abc="'"+arr+"'"
        const id = abc.substring(abc.lastIndexOf("'[") + 2, abc.indexOf("]'"));
        newstr += ' ' + onjkayarrry[i] + ' IN ' + '(' + id + ')' + '___'        }
      }
      
    } 
    if(condition_flag){
  
      console.log("_______________ressend-1_______________")
  
      var newqry = 'SELECT *, (SELECT id FROM wishlist WHERE wishlist.product_id = products_view.id AND user_id = "'+req.query.user_id+'") as wishlist FROM products_view WHERE is_delete = "1" AND (`product_title_name` LIKE "%'+srch+'%" OR `product_description` LIKE "%'+srch+'%" OR `product_type` LIKE "%'+srch+'%" OR `colors` LIKE "%'+srch+'%" )'+' '+'LIMIT'

      var numRows;
      var queryPagination;
      var numPerPage = pg.per_page
      var page = parseInt(pg.page,pg.per_page) || 0;
      var numPages;
      var skip = page * numPerPage;
      // Here we compute the LIMIT parameter for MySQL query
      var limit = skip + ',' + numPerPage;
      connection.query('SELECT count(*) as numRows FROM products_view',(err,results)=>{
            if(err){
              console.log("error:"+err)
              console.log(err)
              //return err
            }else{
              numRows = results[0].numRows;
              numPages = Math.ceil(numRows / numPerPage);
              console.log('number of pages:', numPages);
              console.log('______++++__________________________+++___________________wishlist_query_____________________+++_________________________++++_________')
               console.log(''+newqry+' '+limit+'')
              connection.query(''+newqry+' '+limit+'',(err,results)=>{
                if(err){
                  console.log(err)
                  res.status(502).send(err)
                }else{
                 // console.log("_____")
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
                  //console.log(responsePayload)
                  res.status(200).send(responsePayload)
                }
              })
              
            }
          })
    }else{
      var qry = newstr.replace(/___/g,' AND')
  var lastCharOfHello=qry.slice(-4);//d
  
  if(lastCharOfHello == " AND"){
  var qry = qry.substring(0, qry.lastIndexOf(" "));
    // console.log("and available___"+qry)
  
  }else{
    console.log("no avia")
  }
  
  
      // console.log(typeof qry)
      // console.log(qry)
  
       console.log("_______________ressend-2_______________")
  
       var newqry = qry+' AND is_delete = "1" '+' '+'LIMIT'
       console.log('newqry-------------------------------------------------')
       console.log(newqry)
       var numRows;
  
       var numPerPage = 10
       var page = parseInt(pg.page,pg.per_page) || 0;
       var numPages;
       var skip = page * numPerPage;
       // Here we compute the LIMIT parameter for MySQL query
       var limit = skip + ',' + numPerPage;
         
       connection.query('SELECT count(*) as numRows FROM products_view',(err,results)=>{
             if(err){
               console.log("error:"+err)
               console.log(err)
               //return err
             }else{
               numRows = results[0].numRows;
               numPages = Math.ceil(numRows / numPerPage);
               console.log('number of pages:', numPages);
              //  console.log('______++++__________________________+++___________________wishlist_query_____________________+++_________________________++++_________')
              //  console.log(''+newqry+' '+limit+'')
               connection.query(''+newqry+' '+limit+'',(err,results)=>{
                 if(err){
                   console.log(err)
                   res.status(502).send(err)
                 }else{
                  // console.log("_____")
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
                   res.status(200).send(responsePayload)
                 }
               })
               
             }
           }) 
    }
  }else{
    console.log("invalid_url")
    res.status(200).send("invalid_url")
  }  
}else{
  console.log("no_id")
 // res.status(200).send("no_id")
 var condition_flag = true;
 console.log("in product");
 //console.log(req.query.keydk)
 var catobj = req.body.product_search
 var srch = catobj.search
 var price_to=catobj.price_to;
 var price_from=catobj.price_from;
 console.log(price_to)
 console.log(price_from)
 console.log( catobj)
var pg = req.query
console.log(pg)
console.log(srch)
var newstr = 'SELECT * from products_view WHERE is_delete = "1" AND ' 
if(srch != ''){
console.log("trueeeee")
newstr +='(`product_title_name` LIKE "%'+srch+'%" OR `product_description` LIKE "%'+srch+'%" OR `product_type` LIKE "%'+srch+'%") AND '
}else{
 console.log("falseeee")

}
if (price_to != '' && price_from !='' && srch != '' ) {
 //console.log("trueeeee")
 newstr += '(`sale_price` BETWEEN "'+price_from+'" AND "'+price_to+'") AND'
 condition_flag = false;
} else {
 if(price_to != '' && price_from !=''){
   newstr += '(`sale_price` BETWEEN "'+price_from+'" AND "'+price_to+'") '
   condition_flag = false;  
 }

}
console.log(newstr)
 var onjkayarrry =Object.keys(catobj)
 var onjvaluarrry =Object.values(catobj)

 for(var i=3;i<=onjkayarrry.length-1;i++){

   if(onjvaluarrry[i]!=''){
      condition_flag = false;
      if(price_to != '' && price_from !='' && srch ==''){
       newstr += ' AND'
     }
     if(onjkayarrry.length-1 == i){
               console.log(onjvaluarrry[i])
     var arr = JSON.stringify(onjvaluarrry[i]);
     var abc="'"+arr+"'"
     console.log(abc)
     console.log(typeof abc)
     const id = abc.substring(abc.lastIndexOf("'[") + 2, abc.indexOf("]'"));
     console.log("__"+id+"__")
     newstr += ' ' + onjkayarrry[i] + ' IN ' + '(' + id + ')' 
     }else{
     console.log(onjvaluarrry[i])
     var arr = JSON.stringify(onjvaluarrry[i]);
     var abc="'"+arr+"'"
     console.log(abc)
     console.log(typeof abc)
     const id = abc.substring(abc.lastIndexOf("'[") + 2, abc.indexOf("]'"));
     console.log("__"+id+"__")
     newstr += ' ' + onjkayarrry[i] + ' IN ' + '(' + id + ')' + '___'       
    }
   }
   
 } 
 if(condition_flag){

   console.log("_______________ressend-1_______________")

   var newqry = 'SELECT * FROM `products_view` WHERE is_delete = "1" AND (`product_title_name` LIKE "%'+srch+'%" OR `product_description` LIKE "%'+srch+'%" OR `product_type` LIKE "%'+srch+'%" OR `colors` LIKE "%'+srch+'%" )'+' '+' LIMIT'
   console.log(newqry)
   var numRows;
   var queryPagination;
   var numPerPage = pg.per_page
   var page = parseInt(pg.page,pg.per_page) || 0;
   var numPages;
   var skip = page * numPerPage;
   // Here we compute the LIMIT parameter for MySQL query
   var limit = skip + ',' + numPerPage;
     
   connection.query('SELECT count(*) as numRows FROM products_view',(err,results)=>{
         if(err){
           console.log("error:"+err)
           console.log(err)
           //return err
         }else{
           numRows = results[0].numRows;
           numPages = Math.ceil(numRows / numPerPage);
           console.log("__________________________qry___________________________");

           console.log(''+newqry+' '+limit+'')
           connection.query(''+newqry+' '+limit+'',(err,results)=>{
             if(err){
               console.log(err)
               res.status(502).send(err)
             }else{
              // console.log("_____")
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
               res.status(200).send(responsePayload)
             }
           })
           
         }
       })
 }else{
   var qry = newstr.replace(/___/g,' AND')
var lastCharOfHello=qry.slice(-4);//d

if(lastCharOfHello == " AND"){
var qry = qry.substring(0, qry.lastIndexOf(" "));
 // console.log("and available___"+qry)

}else{
 console.log("no avia")
}
    console.log("_______________ressend-2_______________")

    var newqry = qry+' AND is_delete = "1" '+' '+'LIMIT'
    console.log('newqry-------------------------------------------------')
    console.log(newqry)
    var numRows;

    var numPerPage = 10
    var page = parseInt(pg.page,pg.per_page) || 0;
    var numPages;
    var skip = page * numPerPage;
    // Here we compute the LIMIT parameter for MySQL query
    var limit = skip + ',' + numPerPage;
      
    connection.query('SELECT count(*) as numRows FROM products_view',(err,results)=>{
          if(err){
            console.log("error:"+err)
            console.log(err)
            //return err
          }else{
            numRows = results[0].numRows;
            numPages = Math.ceil(numRows / numPerPage);
            console.log('number of pages:', numPages);
            console.log(newqry)
            connection.query(''+newqry+' '+limit+'',(err,results)=>{
              if(err){
                console.log(err)
                res.status(502).send(err)
              }else{
               // console.log("_____")
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
                res.status(200).send(responsePayload)
              }
            })
            
          }
        }) 
 }
}
} 

  module.exports={user_products_search}


  // SELECT *, (SELECT id FROM wishlist WHERE wishlist.product_id = products_view.product_id AND user_id = "41") as wishlist FROM products_view WHERE is_delete = "1" AND (`product_title_name` LIKE "%%" OR `product_description` LIKE "%%" OR `product_type` LIKE "%%" OR `colors` LIKE "%%" ) LIMIT 0,10