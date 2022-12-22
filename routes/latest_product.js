const connection = require('../db')

function latest_product(req,res){
    connection.query('SELECT * FROM products WHERE `created_on` >= ( CURDATE() - INTERVAL 10 DAY ) ORDER BY id DESC'
    ,(err,results)=>{
        if(err){
          console.log(err)
          res.status(502).send(err)
        }else{
         console.log(results)
         results!=''?res.status(200).send(results):res.status(500).send(" No Products Data ")
        }
    })
}

module.exports={latest_product}