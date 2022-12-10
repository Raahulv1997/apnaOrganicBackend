const connection = require('../db')
function user_products_search(req, res) {

  //SELECT *, (SELECT id FROM wishlist WHERE wishlist.product_id = products_view.product_id) as wishlist FROM products_view

  connection.query("SELECT *, (SELECT id FROM wishlist WHERE wishlist.product_id = products_view.product_id AND user_id = "+req.body.user_id+") as wishlist FROM products_view WHERE is_delete ='1'",(err,results)=>{
    if(err){
      console.log(err)
      res.status(502).send(err)
    }else{
     //console.log(results)
     results!=''?res.status(200).send(results):res.status(500).send("invalid input data ")
     
    }
})

  //   var condition_flag = true;
  //   console.log("in product");
  //   //console.log(req.query.keydk)
  //   var catobj = req.body.product_search
  //   var srch = catobj.search
  
  //   console.log( catobj)
  // var pg = req.query
  // console.log(pg)
  // console.log(srch)
  // var newstr = 'SELECT * from products_view WHERE '
  // if(srch != ''){
  // console.log("trueeeee")
  // newstr +='(`product_title_name` LIKE "%'+srch+'%" OR `product_description` LIKE "%'+srch+'%" OR `product_type` LIKE "%'+srch+'%") AND '
  // }else{
  //   console.log("falseeee")
  
  // }
  // console.log(newstr)
  //   var onjkayarrry =Object.keys(catobj)
  //   var onjvaluarrry =Object.values(catobj)
  
  //   for(var i=1;i<=onjkayarrry.length-1;i++){
  
  //     if(onjvaluarrry[i]!=''){
  //        condition_flag = false;
  
  //       if(onjkayarrry.length-1 == i){
  //         newstr += ' '+onjkayarrry[i]+ '=' + '"' + onjvaluarrry[i] + '"' 
  //       }else{
  //         newstr += ' '+onjkayarrry[i]+ '=' + '"' + onjvaluarrry[i]+'"'+'___'
  //       }
  //     }
      
  //   } 
  //   if(condition_flag){
  
  //     console.log("_______________ressend-1_______________")
  
  //     var newqry = 'SELECT * FROM `products_view` WHERE `product_title_name` LIKE "%'+srch+'%" OR `product_description` LIKE "%'+srch+'%" OR `product_type` LIKE "%'+srch+'%" OR `colors` LIKE "%'+srch+'%" '+' '+'AND is_delete = "1" LIMIT'
  //     console.log(newqry)
  //     var numRows;
  //     var queryPagination;
  //     var numPerPage = pg.per_page
  //     var page = parseInt(pg.page,pg.per_page) || 0;
  //     var numPages;
  //     var skip = page * numPerPage;
  //     // Here we compute the LIMIT parameter for MySQL query
  //     var limit = skip + ',' + numPerPage;
        
  //     connection.query('SELECT count(*) as numRows FROM products_view',(err,results)=>{
  //           if(err){
  //             console.log("/category_error"+err)
  //             console.log(err)
  //             //return err
  //           }else{
  //             numRows = results[0].numRows;
  //             numPages = Math.ceil(numRows / numPerPage);
  //             console.log('number of pages:', numPages);
  //             //console.log(''+newqry+' '+limit+'')
  //             connection.query(''+newqry+' '+limit+'',(err,results)=>{
  //               if(err){
  //                 console.log(err)
  //                 res.status(502).send(err)
  //               }else{
  //                // console.log(results)
  //                 var responsePayload = {
  //                   results: results
  //                 };
  //                 if (page < numPages) {
  //                   responsePayload.pagination = {
  //                     current: page,
  //                     perPage: numPerPage,
  //                     previous: page > 0 ? page - 1 : undefined,
  //                     next: page < numPages - 1 ? page + 1 : undefined
  //                   }
  //                 }
  //                 else responsePayload.pagination = {
  //                   err: 'queried page ' + page + ' is >= to maximum page number ' + numPages
  //                 }
  //                 console.log("responsePayload++++++++++++++++++++++++++++++++++++++++");
  //                 //console.log(responsePayload);
  //                 res.status(200).send(responsePayload)
  //               }
  //             })
              
  //           }
  //         })
  //   }else{
  //     var qry = newstr.replace(/___/g,' AND')
  // var lastCharOfHello=qry.slice(-4);//d
  
  // if(lastCharOfHello == " AND"){
  // var qry = qry.substring(0, qry.lastIndexOf(" "));
  //   // console.log("and available___"+qry)
  
  // }else{
  //   console.log("no avia")
  // }
  
  
  //     // console.log(typeof qry)
  //     // console.log(qry)
  
  //      console.log("_______________ressend-2_______________")
  
  //      var newqry = qry+' AND is_delete = "1" '+' '+'LIMIT'
  //      console.log('newqry-------------------------------------------------')
  //      console.log(newqry)
  //      var numRows;
  
  //      var numPerPage = 10
  //      var page = parseInt(pg.page,pg.per_page) || 0;
  //      var numPages;
  //      var skip = page * numPerPage;
  //      // Here we compute the LIMIT parameter for MySQL query
  //      var limit = skip + ',' + numPerPage;
         
  //      connection.query('SELECT count(*) as numRows FROM products_view',(err,results)=>{
  //            if(err){
  //              console.log("/category_error"+err)
  //              console.log(err)
  //              //return err
  //            }else{
  //              numRows = results[0].numRows;
  //              numPages = Math.ceil(numRows / numPerPage);
  //              console.log('number of pages:', numPages);
  //              //console.log(''+newqry+' '+limit+'')
  //              connection.query(''+newqry+' '+limit+'',(err,results)=>{
  //                if(err){
  //                  console.log(err)
  //                  res.status(502).send(err)
  //                }else{
  //                 // console.log(results)
  //                  var responsePayload = {
  //                    results: results
  //                  };
  //                  if (page < numPages) {
  //                    responsePayload.pagination = {
  //                      current: page,
  //                      perPage: numPerPage,
  //                      previous: page > 0 ? page - 1 : undefined,
  //                      next: page < numPages - 1 ? page + 1 : undefined
  //                    }
  //                  }
  //                  else responsePayload.pagination = {
  //                    err: 'queried page ' + page + ' is >= to maximum page number ' + numPages
  //                  }
  //                  console.log("responsePayload++++++++++++++++++++++++++++++++++++++++");
  //                  //console.log(responsePayload);
  //                  res.status(200).send(responsePayload)
  //                }
  //              })
               
  //            }
  //          }) 
  //   }
  } 
  module.exports={user_products_search}