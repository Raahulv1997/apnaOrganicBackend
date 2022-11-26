const connection = require('../db')

function admin_login(req,res){
 
    //INSERT INTO `admin_login_details`(`admin_email`, `admin_name`, `admin_phone`, `admin_type`, `admin_password`) VALUES ('mayur.we2code@gmail.com','mayur','1234567890','1','superwe2code')
var {admin_email,admin_password} = req.body
    connection.query('SELECT * FROM `admin_login_details` WHERE `admin_email` ="'+admin_email+'" AND `admin_password` ="'+admin_password+'"',(err,results)=>{
        if(err){
          console.log(err)
          res.send(err)
        }else{
            if(results != ''){
                res.send("login_ok")
                console.log(results)
            }else{
                res.send("check_credintials") 
            }
            
        }
})
}
module.exports = {admin_login};