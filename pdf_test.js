var fs = require("fs");
const path = require("path");
var burl =
// var buf = Buffer.from("utf-8", burl);
// // Your code to handle buffer
// fs.writeFile("result_buffer.pdf", buf, (error) => {
//   if (error) {
//     console.log(error);
//     throw error;
//   } else {
//     console.log("buffer saved!");
//   }
// });
// const fs = require("fs");

console.log(
  path.join(
    __dirname,
    "/home/we2code/Desktop/newBackend27march/apna_backend/public/vendor_documents/"
  )
);

try {
  var base64Data = burl.replace("data:image/png;base64,", "");
  var name_str = "mayur_1";
  fs.writeFileSync(
    path.join(__dirname) + name_str + "." + pdf + "",
    base64Data,
    "base64"
  );
} catch (err) {
  //console.log(err)
}