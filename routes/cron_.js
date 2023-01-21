const connection = require('../db')
const cron = require('node-cron');

function publish_blog() {
    //console.log("node-cron-fun")
    cron.schedule('0 0 */1 * * *', () => {
      //console.log('node-cron-test');
      const date = new Date().toISOString('en-US', { timeZone: 'Asia/Kolkata' }).slice(0, 10);;
      //console.log(date)
  
      const str_publish = 'UPDATE `blog` SET `status`="Published" WHERE is_delete="1" AND status = "approved" AND publish_date = "' + date + ' 00:00:00" '
      //console.log(str_publish)
      connection.query(str_publish, (err, rows, fields) => {
        if (err) {
          //console.log(err)
        } else {
          //console.log("_____")
        }
      })
    });
  }

  module.exports = {publish_blog }