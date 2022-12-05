const connection = require('../db')

function add_to_cart(req,res){
var {user_id,product_id,price,discount,quantity,is_active} = req.body

    console.log(req.body)

    connection.query('INSERT INTO `cart`(`user_id`, `product_id`, `price`, `discount`, `quantity`, `is_active`) VALUES ('+user_id+','+product_id+','+price+','+discount+','+quantity+','+is_active+')', (err, rows, fields) => {
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
    connection.query('SELECT * FROM `cart` WHERE user_id='+req.query.user_id+'', (err, rows, fields) => {
        if (err) {
          console.log(err)
          res.status(500).send(err)
        } else {
            res.status(200).send(rows)
            console.log(rows) 
        }})   
}

module.exports = { add_to_cart,cart };