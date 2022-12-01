const connection = require('../db')



function review_rating(req,res){
    console.log("review")
    var {product_name,category_type,review_date,review_rating,comment,status}=req.body;
    connection.query('INSERT INTO  `review`(`product_name`, `category_type`, `review_date`, `review_rating`, `comment`, `status`) VALUES ("'+product_name+'","'+category_type+'","'+review_date+'","'+review_rating+'","'+comment+'","'+status+'")',(err,rows,fields)=>{
        if(err){
          res.send(err)
        }else{
            console.log("review_rating Data Insert Succecsfully")
          res.send("review_rating Data Insert Succecsfully")
        }
      }) 

}


function review_approved(req,res){

    var {id,status,note}=req.body;
    connection.query('UPDATE `review` SET `status`="'+status+'",`note`="'+note+'"  WHERE `id`="'+id+'" ',(err,rows,fields)=>{
        if(err){
          res.send(err)
        }else{
            console.log("review_approved update Succecsfully")
          res.send("review_approved update Succecsfully")
        }
      }) 
}



function review_list(req,res){
    console.log(req.body)
    var {product_name,category_type,status}=req.body;
    if(product_name != '' || category_type != '' || status != '' ){

        var stringsearch = 'SELECT * FROM `review` WHERE '
        var catobj=req.body;
        console.log(catobj)
        var objvalue=Object.values(catobj)
        var objkey=Object.keys(catobj)
        for(m=0;m<objkey.length;m++){
        if(objvalue[m]!=''){
        if(m==0){
          stringsearch+="`"+objkey[m]+"` LIKE '%"+objvalue[m]+"%' "
        }else{
          if(objvalue[0]==''){
            stringsearch+="`"+objkey[m]+"` LIKE '%"+objvalue[m]+"%' AND "
          }else{
            stringsearch+=" AND `"+objkey[m]+"` LIKE '%"+objvalue[m]+"%'"
          }
        }
      }
      }
      console.log(stringsearch)
      var lastCharOfHello=stringsearch.slice(-4);
      console.log("________"+lastCharOfHello+"_______")
      if(lastCharOfHello == "AND "){
        var id = stringsearch.substring(stringsearch.lastIndexOf(' AND') +1, stringsearch.indexOf("  "));   
        stringsearch=id;
        }else{
           
          console.log("no avia")
        }
      connection.query(''+stringsearch+'',(err,rows,fields)=>{
        if(err){
          console.log("/review_error"+err)
          res.send(err)
        }else{
          res.send(rows)
        }
      })
}else{
connection.query('SELECT * FROM `review` WHERE 1',(err,rows,fields)=>{
    if(err){
      console.log("/review_error"+err)
      res.send(err)
    }else{
      res.send(rows)
    }
  })
}      
}




module.exports={review_rating,review_approved,review_list}
