const connection = require('../../db.js')
var jwt = require('jsonwebtoken');

const USER_JWT_SECRET_KEY =   process.env.USER_JWT_SECRET_KEY
const ADMIN_JWT_SECRET_KEY =  process.env.ADMIN_JWT_SECRET_KEY
const VENDOR_JWT_SECRET_KEY = process.env.VENDOR_JWT_SECRET_KEY


const fetchuser = (req, res, next) => {
    console.log("fetchuser++++++++++++++")
    //var token = req.headers.user_token
    //var token = req.headers.admin_token
    if('admin_token' in req.headers || 'user_token' in req.headers || 'vendor_token' in req.headers ){
        if(req.headers.admin_token!=''&&req.headers.admin_token!=undefined){
            console.log("ADMIN++++++++++++++")
            var token_admin = req.headers.admin_token
            console.log(token_admin)
        
            try {
                var admin_data = jwt.verify(token_admin, ADMIN_JWT_SECRET_KEY);
                var aid = admin_data.id
                console.log(aid)
        
                connection.query("SELECT * FROM `admin_login_details` WHERE `id` = "+aid+"",async (err, rows) => {
                    if(err){
                      console.log("error"+err)
                      res.status(200).send(err)
                    }else{
                    if(rows!=''){
                        console.log("admin_login_details+++++++")
                        console.log(rows)
        
                        if(req.body.user_id!=undefined){
                            req.user=req.body.user_id
                            console.log("user_id")
                            console.log(req.user)
                            next();
                        }
                        else if(req.body.vendor_id!=undefined){
                            req.user=req.body.vendor_id
                            

                            if(req.body.vendor_id == 'all'){req.scrt="y9a2d3a2v8"}
                            
                            console.log("vendor_id")
                            console.log(req.user)
                            next();
                        }
                        else if(req.body.admin_id!=undefined){
                            req.user=req.body.admin_id
                            console.log(req.user)
                            console.log("admin_id")
                            next();
                        }else{
                           req.user=00
                           req.admin_vendor_com_id=aid
                           req.scrt="a2d3m6i4n6"
                           next(); 
                        }
                    }else{
                       res.status(200).send("admin not matched")
                    }
                  
                    }
                  })
            } catch (error) {
                res.status(401).send({ error: "Please authenticate using a valid token" })
            }
        }else{
        
        }
        //_______________________++++++--user--++++++___________________________
        
        if(req.headers.user_token!=''&&req.headers.user_token!=undefined){
            var token_user = req.headers.user_token
              try {
                  const data_u = jwt.verify(token_user, USER_JWT_SECRET_KEY);
                  req.user = data_u.id;
                  console.log("userrrrrrrrrrrrrrrrrrrrr")
                  console.log(data_u)
                  console.log(req.user)
                  next();
              } catch (error) {
                  res.status(401).send({ error: "Please authenticate using a valid token" })
              }
          }


        //_______________________++++++--vendor--++++++___________________________
        
        if(req.headers.vendor_token!=''&&req.headers.vendor_token!=undefined){
            var token_vendor = req.headers.vendor_token
              try {
                const data_v = jwt.verify(token_vendor, VENDOR_JWT_SECRET_KEY);
                req.user = data_v.id;
                req.admin_vendor_com_id=data_v.id;
                req.vendor_id=data_v.id
                console.log("vendorrrrrrrrrrrrrrrr")
                console.log(data_v)
                console.log(req.user)
                connection.query("SELECT * FROM `vendor` WHERE `id` = "+data_v.id+"",async (err, rows) => {
                    if(err){
                      console.log("error"+err)
                      res.status(200).send(err)
                    }else{
                        if(rows!=''){
                            next();
                        }else{
                            res.status(200).send({"response":"vendor not find"})
                        }
                    }

                })

              } catch (error) {
                  res.status(401).send({ error: "Please authenticate using a valid token" })
              }
          }
    }else{
        //res.send(req.headers.admin_token)
        res.send({"response":"header error"})  

    }


//_______________________________________________________________________________________________________________





    // return false
    // if (!token) {
    //     res.status(401).send({ error: "Please authenticate using a valid token" })
    // }
    // try {
    //     const data = jwt.verify(token, USER_JWT_SECRET_KEY);
    //     req.user = data.id;
    //     console.log(data)
    //     console.log(req.user)
    //     next();
    // } catch (error) {
    //     res.status(401).send({ error: "Please authenticate using a valid token" })
    // }

}

// const fetchadmin = (req, res, next) => {
//     console.log("fetchadmin++++++++++++++")
//     var token = req.headers.admin_token
//     console.log(token)
//     if (!token) {
//         res.status(401).send({ error: "Please authenticate using a valid token" })
//     }
//     try {
//         const data = jwt.verify(token, ADMIN_JWT_SECRET_KEY);
//         req.admin = data.id;
//         console.log(data)
//         console.log(req.admin)
//         next();
//     } catch (error) {
//         res.status(401).send({ error: "Please authenticate using a valid token" })
//     }

// }

// const fetchvendor = (req, res, next) => {
//     console.log("fetchadmin++++++++++++++")
//     var token = req.headers.vendor_token
//     console.log(token)
//     if (!token) {
//         res.status(401).send({ error: "Please authenticate using a valid token" })
//     }
//     try {
//         const data = jwt.verify(token, VENDOR_JWT_SECRET_KEY);
//         req.vendor = data.id;
//         console.log(data)
//         console.log(req.vendor)
//         next();
//     } catch (error) {
//         res.status(401).send({ error: "Please authenticate using a valid token" })
//     }

// }
module.exports = {fetchuser}