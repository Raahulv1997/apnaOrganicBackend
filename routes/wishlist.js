const connection = require('../db')

function add_wishlist(req,res){
    console.log(req.body)
    var {user_id,product_view_id}=req.body;
    connection.query('SELECT * FROM `wishlist` WHERE `user_id`='+user_id+'  AND `product_id`='+product_view_id+' ',(err,results)=>{
        if(err){
          console.log(err)
          res.status(502).send(err)
        }else{
         console.log(results)
         if(results==''){   
        connection.query("INSERT INTO `wishlist`(`user_id`, `product_id`) VALUES ('"+user_id+"','"+product_view_id+"')",(err,results)=>{
      if(err){
        console.log(err)
        res.status(502).send(err)
      }else{
       console.log(results)
       results!=''?res.status(200).send(results):res.status(500).send("Invalid Input Data ")
      }
      })
         }else{
          res.status(500).send("Already add in wishlist")
         }       
        }
    })
}

function remove_product_from_wishlist(req,res){
  console.log(req.body)
    connection.query("DELETE FROM `wishlist` WHERE `product_id` = '"+req.body.product_id+"' AND `user_id` = '"+req.body.user_id+"'",(err,results)=>{
        if(err){
          console.log(err)
          res.status(502).send(err)
        }else{
         console.log(results.affectedRows)
         results.affectedRows=='1'?res.status(201).send("Successfully Removed Data From Wishlist"):res.status(500).send("invalid input data ")
         
        }
    })
}

function wishlist(req,res){
  
  connection.query("SELECT * FROM `wishlist_view1` WHERE user_id = '"+req.query.user_id+"'",(err,results)=>{
    if(err){
      console.log(err)
      res.status(502).send(err)
    }else{
     console.log(results.affectedRows)
     results!=''?res.status(201).send(results):res.status(500).send("invalid url")
    }
})
}


module.exports={add_wishlist,remove_product_from_wishlist,wishlist}