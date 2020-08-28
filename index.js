// ------------Install Express----------------
const express = require("express");
const app = express();

//------------Port------------------
const port = 1433;
app.listen(port,()=>console.log(`Server: http://localhost:${port}`));

//------------View Engine EJS-----------------
app.set("view engine","ejs");

//------------Set Up static folder------------
app.use(express.static("public"));

//------------Install Mssql------------
const mssql = require("mssql");
// const config = {
//     server:'LAPTOP-QAOLFL7H\\SQLEXPRESS',
//     database:'Lap4',
//     user:'sa',
//     password:'123456',
//     options: {
//         encrypt: false
//     }
// };

mssql.connect(config,(err)=>{
    if(err) console.log(err);
    else console.log("Connect Database Success !");
});
var db = new mssql.Request();

//------------Install Body Parser------------
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended:true}))