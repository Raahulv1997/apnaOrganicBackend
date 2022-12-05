const connection = require('../db')
function add_wishlist(req,res){
    console.log(req.body)
    var {user_id,product_id}=req.body
    connection.query("INSERT INTO `wishlist`(`user_id`, `product_id`) VALUES ('"+user_id+"','"+product_id+"')",(err,results)=>{
        if(err){
          console.log(err)
          res.status(502).send(err)
        }else{
         console.log(results)
         results!=''?res.status(200).send(results):res.status(500).send("invalid input data ")
         
        }
    })
}

function remove_product_from_wishlist(req,res){
    connection.query("DELETE FROM `wishlist` WHERE `id` = "+req.body.id+" AND `user_id` = '"+req.body.user_id+"'",(err,results)=>{
        if(err){
          console.log(err)
          res.status(502).send(err)
        }else{
         console.log(results.affectedRows)
         results.affectedRows=='1'?res.status(201).send("successfully removed data from wishlist"):res.status(500).send("invalid input data ")
         
        }
    })
}
module.exports={add_wishlist,remove_product_from_wishlist}