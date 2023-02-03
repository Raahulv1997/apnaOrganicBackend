const connection = require('../db')

function notification(req,res){
//console.log("req.body")
var {actor_id,actor_type}=req.body
connection.query('SELECT * FROM `notification` WHERE actor_id = "'+actor_id+'" AND actor_type = "'+actor_type+'" ORDER BY id DESC', (err, rows, fields) => {
    if (err) {
      //console.log("/notification" + err)
      res.status(200).send(err)
    } else {
     // res.status(200).send(rows)
      if(rows!=''){
        res.status(200).send(rows)
      connection.query('UPDATE `notification` SET `status`="read" WHERE actor_id = "'+actor_id+'" AND actor_type = "'+actor_type+'"', (err, rows, fields) => {
        if (err) {
          //console.log("/notification" + err)
          res.status(200).send(err)
        } else {
          console.log("update notification data update read ")
        }
      })
      
      
      }else{
        res.status(200).send({"response":"empty"})
      }
    }
  })
}
module.exports={notification}