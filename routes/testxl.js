const connection = require('../db')
const reader = require('xlsx');
const path = require('path');
const fs = require('fs');

function test(){
console.log("tset chk")
const file = reader.readFile('../routes/agw.xls')
          const sheets = file.SheetNames; 
          console.log(sheets)
          for (let j = 0; j < sheets.length; j++) {
            console.log("count_j"+j+"slength"+sheets.length)
              const temp = reader.utils.sheet_to_json(
                  file.Sheets[file.SheetNames[j]]);
                  console.log("temp------------------------")
                  console.log(temp)
                }
}
test()