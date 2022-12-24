const connection = require('../db')
const bcrypt = require("bcrypt")
async function admin_login(req,res){
 
var {admin_email,admin_password} = req.body

const salt = await bcrypt.genSalt(10);
password_salt = await bcrypt.hash(admin_password, salt);
console.log(password_salt)

// const validPassword = await bcrypt.compare(admin_password,'$2b$10$81UsHRVghsW.47o7dMqiQ.DsJgTfz333wDFKTYZYQOGkJhoSEr1m6');
// console.log(validPassword)

 connection.query('SELECT `admin_email` , `admin_password` FROM `admin_login_details`  WHERE `admin_email` ="'+admin_email+'"',async (err,results)=>{
        if(err){
          console.log(err)
          res.send(err)
        }else{
            if(results != ''){
                
                    console.log(results)
                    var psw =  JSON.parse(JSON.stringify(results[0].admin_password))
                    console.log(typeof psw)
                    const validPassword = await bcrypt.compare(admin_password,psw);
                    console.log(validPassword)
                    validPassword ?res.send(true) : res.send("check_credintials")
                    
            }else{
                res.send("check_credintials") 
            }
            
        }
})
}

async function update_password(req,res){
 
    //INSERT INTO `admin_login_details`(`admin_email`, `admin_name`, `admin_phone`, `admin_type`, `admin_password`) VALUES ('mayur.we2code@gmail.com','mayur','1234567890','1','superwe2code')
var {admin_email,admin_password,new_admin_password} = req.body
if(admin_email != '' && admin_password != '' && new_admin_password != ''){
    console.log("fill all")
    connection.query('SELECT `admin_email` , `admin_password` FROM `admin_login_details`  WHERE `admin_email` ="'+admin_email+'"',async (err,results)=>{
        if(err){
          console.log(err)
          res.send(err)
        }else{
            if(results != ''){
                    console.log(results)
                    var psw =  JSON.parse(JSON.stringify(results[0].admin_password))
                    console.log(typeof psw)
                    const validPassword = await bcrypt.compare(admin_password,psw);
                    console.log(validPassword)
                    if(validPassword) { 
                        const salt = await bcrypt.genSalt(10);
                        password_salt = await bcrypt.hash(new_admin_password, salt);
                        console.log(password_salt)
                        connection.query('UPDATE `admin_login_details` SET `admin_password`= "'+password_salt+'" WHERE `admin_email` = "'+admin_email+'"',async (err,results)=>{
                            if(err){
                            console.log(err)
                            res.send(err)
                            }else{
                                console.log("password_updated")
                                res.send("password_updated")
                            }
                        })
                    }else{
                         res.send("check_credintials")
                        }
            }else{
                res.send("check_credintials") 
            }
        }
})
}else{
    console.log("plaese fill all input")
}
}

function admin_forgot_password(req,res){
console.log(req.body.admin_email)
connection.query('SELECT `admin_email`, `admin_password` FROM `admin_login_details`  WHERE `admin_email` ="'+req.body.admin_email+'"',async (err,results)=>{
    if(err){
        console.log(err)
        res.send(err)
    }else{
        if(results != ''){
                
                var saltpsw = JSON.parse(JSON.stringify(results[0].admin_password))
                // const salt = await bcrypt.genSalt(10);
                // deco_salt = await bcrypt.hash(saltpsw, salt);
                console.log("send_password_on_your_mail")
                res.send(saltpsw)

        }else{
            console.log("invalid_mail")
            res.send("invalid_mail")
        }
    }
})

}

function update_admin(req,res){
    var {id,admin_email,admin_name,admin_phone,admin_type}=req.body
    console.log(req.body)

    connection.query('UPDATE `admin_login_details` SET `admin_name`="'+admin_name+'",`admin_phone`="'+admin_phone+'",`admin_type`="'+admin_type+'"  WHERE `admin_email`="'+admin_email+'" AND `id`='+id+'', (err, rows, fields) => {
      if (err) {
        console.log(err)
        res.send(err)
      } else {
        console.log("successfully_updated")
        res.send(rows)
      }
    })
}

async function add_admin(req,res){
console.log(req.body)
var {admin_email, admin_name, admin_phone, admin_type,admin_password}=req.body
const salt = await bcrypt.genSalt(10);
co_salt = await bcrypt.hash(admin_password, salt);
connection.query('INSERT INTO `admin_login_details`(`admin_email`, `admin_name`, `admin_phone`, `admin_type`, `admin_password`) VALUES ("'+admin_email+'", "'+admin_name+'", "'+admin_phone+'", "'+admin_type+'","'+co_salt+'")', (err, rows, fields) => {
    if (err) {
      console.log(err)
      res.send(err)
    } else {
      console.log("successfully_updated")
      res.send(rows)
    }
  })

}

function admin_search(req,res){

    console.log(req.body)
    var {admin_name,admin_type}=req.body
    if(admin_name =='' && admin_type == ''){
        connection.query('SELECT * FROM `admin_login_details` WHERE  1',(err,rows,fields)=>{
            if(err){
              console.log("/admin_login_details_error"+err)
              res.send(err)
            }else{
             res.send(rows)
            }
          })   
    }else{
        if(admin_name != '' && admin_type ==''){
            connection.query('SELECT * FROM `admin_login_details` WHERE `admin_name` LIKE "%'+admin_name+'%" ',(err,rows,fields)=>{
                if(err){
                  console.log("/admin_login_details_error"+err)
                  res.send(err)
                }else{
                  res.send(rows)
                }
              })
        }
    
        if(admin_type!='' && admin_name == ''){
            connection.query('SELECT * FROM `admin_login_details` WHERE `admin_type` LIKE "%'+admin_type+'%" ',(err,rows,fields)=>{
                if(err){
                  console.log("/admin_login_details_error"+err)
                  res.send(err)
                }else{
                 res.send(rows)
                }
              }) 
        }
    }
    if(admin_type!='' && admin_name != ''){
        connection.query('SELECT * FROM `admin_login_details` WHERE  `admin_name` LIKE "%'+admin_name+'%"  AND`admin_type` LIKE "%'+admin_type+'%"',(err,rows,fields)=>{
            if(err){
              console.log("/admin_login_details_error"+err)
              res.send(err)
            }else{
              res.send(rows)
            }
          })   
    }
}

function admin(req,res){
  if(req.query.id == 'all'){
    connection.query('SELECT * FROM admin_login_details WHERE 1  ',(err,rows,fields)=>{
      if(err){
        res.send(err)
      }else{
        res.send(rows)
      }
    })
  }else{
    connection.query('SELECT * FROM admin_login_details WHERE id ='+req.query.id+' ',(err,rows,fields)=>{
      if(err){
        console.log("/category_error"+err)
        res.send(err)
      }else{
        //console.log(rows)
        res.send(rows)
      }
    }) 
  }
}

function vendor_status_change(req,res){
  console.log(req.body.id)
  connection.query('UPDATE `vendor` SET `status`= "'+req.body.status_change+'" WHERE `id` = '+req.body.id+'',(err,rows,fields)=>{
    if(err){
      console.log("/vendor_update_error"+err)
      res.send(err)
    }else{
      if(rows!=''){
        res.send(rows)
        console.log("succesfully updated vendor status")
      }else{
        console.log("not update vendor status")
        res.send("not update vendor status")
      }
    }
  })
  }

function vendor_availability(req,res){
  // console.log(req.body.id)
  connection.query('UPDATE `vendor` SET `availability`= "'+req.body.availability_change+'" WHERE `id` = '+req.body.id+'',(err,rows,fields)=>{
    if(err){
      console.log("/vendor_update_error"+err)
      res.send(err)
    }else{
      if(rows!=''){
        res.send(rows)
        console.log("succesfully updated vendor availability")
      }else{
        console.log("not update vendor availability")
        res.send("not update vendor availability")
      }
    }
  }) 
}

function vendor_requests(req,res){

  connection.query('SELECT * FROM vendor WHERE status ="pending" ',(err,rows,fields)=>{
    if(err){
      console.log("/vendor_error"+err)
      res.send(err)
    }else{
      //console.log(rows)
      res.send(rows)
    }
  }) 

}


function brand_list(req,res){
  connection.query('SELECT DISTINCT brand FROM products WHERE 1',(err,rows,fields)=>{
    if(err){
      console.log("/brand_list"+err)
      res.send(err)
    }else{
      console.log(rows)
      res.send(rows)
    }
  }) 
}
module.exports = {admin_login,update_password,admin_forgot_password,update_admin,add_admin,admin_search,admin,vendor_status_change,vendor_availability,vendor_requests,brand_list};
