const nodemailer = require("nodemailer")
const connection = require('../db')



function gmail_send(req, res) {
    //console.log("req.body")
    var { id, email_type, email } = req.body;

    connection.query('SELECT * FROM email_template WHERE id=' + id + ' AND email_type="' + email_type + '"  ', (err, rows, fields) => {
        if (err) {
            res.status(200).send(err)
        } else {
            //console.log(rows[0].email_text)
            var html_data = rows[0].email_text;
            // res.status(200).send(rows)
            const mail_configs = {
                from: 'ashish.we2code@gmail.com',
                to: email,
                subject: 'Apna Organic Store',
                text: "One-time-password ",
                html: html_data
            }

            nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'ashish.we2code@gmail.com',
                    pass: 'nczaguozpagczmjv'
                }
            })
                .sendMail(mail_configs, (err) => {
                    if (err) {
                        return //console.log('errrr', err);
                    } else {
                        return res.status(200).send({ "message": "Send Gmail Succesfully" });
                    }
                })
        }
    })





}


module.exports = { gmail_send }