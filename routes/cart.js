const connection = require('../db')

function add_to_cart(req,res){
var {user_id,product_view_id,price,discount,quantity,is_active} = req.body

    console.log(req.body)

    connection.query('INSERT INTO `cart`(`user_id`, `product_view_id`, `price`, `discount`, `quantity`, `is_active`) VALUES ('+user_id+','+product_view_id+','+price+','+discount+','+quantity+','+is_active+')', (err, rows, fields) => {
        if (err) {
          console.log(err)
          res.status(500).send(err)
        } else {
            res.status(200).send(rows)
            console.log(rows) 
        }})

}

function cart(req,res){
  console.log(req.query.user_id)
    console.log("user_cart")
    connection.query('SELECT * FROM `cart_view` WHERE user_id='+req.query.user_id+'', (err, rows, fields) => {
        if (err) {
          console.log(err)
          res.status(500).send(err)
        } else {
            res.status(200).send(rows)
            console.log(rows) 
        }})   
}

function remove_cart(req,res){
  console.log(req.body)
  connection.query("DELETE FROM `cart` WHERE `id` = "+req.body.id+" AND `user_id` = '"+req.body.user_id+"'",(err,results)=>{
    if(err){
      console.log(err)
      res.status(502).send(err)
    }else{
     console.log(results.affectedRows)
     results.affectedRows=='1'?res.status(201).send("successfully removed data from wishlist"):res.status(500).send("invalid input data ")
     
    }
  })
  }
  
  function cart_update(req,res){
    var {id,quantity} = req.body
    console.log(req.body)
      connection.query('UPDATE `cart` SET `quantity`='+quantity+'  WHERE id='+id+'', (err, rows, fields) => {
          if (err) {
            console.log(err)
            res.status(500).send(err)
          } else {
           // rows!=''?res.send(rows):res.send("faild updates")
           rows.affectedRows=='1'?res.status(201).send("updated successfully"):res.status(500).send("invalid input data ")

            console.log(rows) 
          }})   
  }

  function cart_list(req,res){
    console.log("carttttttttttttt")
  //   connection.query("SELECT * FROM `cart_view` WHERE user_id = '"+req.query.user_id+"'",(err,results)=>{
  //     if(err){
  //       console.log(err)
  //       res.status(502).send(err)
  //     }else{
  //      console.log(results.affectedRows)
  //      results!=''?res.status(201).send(results):res.status(500).send("invalid url")
  //     }
  // })
  }

module.exports = { add_to_cart, cart, remove_cart, cart_update, cart_list };
