var jwt = require('jsonwebtoken');
const USER_JWT_SECRET_KEY = process.env.USER_JWT_SECRET_KEY


const fetchuser = (req, res, next) => {
    console.log("fetchuser++++++++++++++")
    var token = req.headers.user_token
    console.log(token)
    if (!token) {
        res.status(401).send({ error: "Please authenticate using a valid token" })
    }
    try {
        const data = jwt.verify(token, USER_JWT_SECRET_KEY);
        req.user = data.id;
        console.log(data)
        console.log(req.user)
        next();
    } catch (error) {
        res.status(401).send({ error: "Please authenticate using a valid token" })
    }

}
module.exports = {fetchuser}