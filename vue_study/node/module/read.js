const fs = require('fs')
// fs.readFile("c:/temp/data.txt","utf-8", function(err,data){
//   if(err){
//     throw err;
//   } else{
//     console.log(data);
//   }
// })
// console.log("the end")

const data = fs.readFileSync('c:/temp/data.txt','utf-8');
console.log(data);
console.log("the end")