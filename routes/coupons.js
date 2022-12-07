const connection = require('../db')



function coupon(req,res){
    if(req.query.coupon_id == 'all'){
        connection.query('SELECT * FROM coupons WHERE 1  ',(err,rows,fields)=>{
          if(err){
            res.send(err)
          }else{
            res.send(rows)
          }
        })
      }else{
        connection.query('SELECT * FROM coupons WHERE id ='+req.query.coupon_id+' ',(err,rows,fields)=>{
          if(err){
            console.log("/Coupouns_error"+err)
            res.send(err)
          }else{
            //console.log(rows)
            res.send(rows)
          }
        }) 
      }
}



// function coupons_add(req,res){
// console.log("coupons_add")
// console.log(req.body)
// var {campaign_name,code,product_type,start_date,end_date,minimum_amount,percentage,status,image}=req.body;

// connection.query('INSERT INTO `coupons`(`campaign_name`, `code`, `product_type`, `start_date`, `end_date`, `minimum_amount`, `percentage`, `status`,`image`) VALUES ("'+campaign_name+'","'+code+'","'+product_type+'","'+start_date+'","'+end_date+'","'+minimum_amount+'","'+percentage+'","'+status+'","'+image+'")',(err,rows,fields)=>{
//     if(err){
//       res.send(err)
//     }else{
//         console.log("Coupon Data Insert Succecsfully")
//       res.send("Coupon Data Insert Succecsfully")
//     }
//   })
// }

function coupons_add(req,res){
  console.log("coupons_add")
  console.log(req.body)
  var {campaign_name,code,product_type,start_date,end_date,minimum_amount,percentage,status}=req.body;
  
  if(req.file == undefined || req.file == '' ){
    image="no image"
  }else{
    var image = "public/catgory_images/"+req.file.filename;
    console.log(image)
  }
  connection.query('INSERT INTO `coupons`(`campaign_name`, `code`, `product_type`, `start_date`, `end_date`, `minimum_amount`, `percentage`, `status`,`image`) VALUES ("'+campaign_name+'","'+code+'","'+product_type+'","'+start_date+'","'+end_date+'","'+minimum_amount+'","'+percentage+'","'+status+'","'+image+'")',(err,rows,fields)=>{
      if(err){
        res.send(err)
      }else{
          console.log("Coupon Data Insert Succecsfully")
        res.send("Coupon Data Insert Succecsfully")
      }
    })
  }



function coupon_update(req,res){
    console.log(req.body)
   var {campaign_name,code,product_type,start_date,end_date,minimum_amount,percentage,status,id}=req.body;
   if(req.file == undefined || req.file == '' ){
    image="no image"
  }else{
    var image = "public/catgory_images/"+req.file.filename;
    console.log(image)
  }
   connection.query('UPDATE `coupons` SET `campaign_name`="'+campaign_name+'",`code`="'+code+'",`product_type`="'+product_type+'",`start_date`="'+start_date+'",`end_date`="'+end_date+'",`minimum_amount`="'+minimum_amount+'",`percentage`="'+percentage+'",`status`="'+status+'",`image`="'+image+'"  WHERE `id`='+id+' ',(err,rows,fields)=>{
    if(err){
      res.send(err)
    }else{
        console.log("Coupon Data Update Succecsfully")
      res.send("Coupon Data Update Succecsfully")
    }
  })  
}

function coupons_list(req,res){
    console.log(req.body)
    var {campaign_name,code,status}=req.body;
    if(campaign_name != '' || code != '' || status != '' ){

        var stringsearch = 'SELECT * FROM `coupons` WHERE '
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
        console.log("andddddddddd")
        var id = stringsearch.substring(stringsearch.lastIndexOf(' AND') +1, stringsearch.indexOf("  "));   
        stringsearch=id;
        }else{
           
          console.log("no avia")
        }
      connection.query(''+stringsearch+'',(err,rows,fields)=>{
        if(err){
          console.log("/Coupouns_error"+err)
          res.send(err)
        }else{
          res.send(rows)
        }
      })
}else{
connection.query('SELECT * FROM `coupons` WHERE 1',(err,rows,fields)=>{
    if(err){
      console.log("/Coupouns_error"+err)
      res.send(err)
    }else{
      res.send(rows)
    }
  })
}      
}


function coupons_delete(req,res){

var {id,is_active}=req.body
console.log(req.body)
if(is_active == '0'){
  connection.query('UPDATE vendor SET is_active= "'+is_active+'" WHERE id='+id+' ', (err, rows, fields) => {
    if (err) {
      console.log(err)
      res.send(err)
    } else {
      console.log("successfully_products_deleted")
      res.send(rows)
    }
  })
}else{
  res.send("not deleted product")
}
      
}


module.exports={coupons_add,coupon_update,coupons_list,coupon,coupons_delete}