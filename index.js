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
// const mssql = require("mssql");
// const config = {
//     server:'LAPTOP-QAOLFL7H\\SQLEXPRESS',
//     database:'Lap4',
//     user:'sa',
//     password:'123456',
//     options: {
//         encrypt: false
//     }
// };

// mssql.connect(config,(err)=>{
//     if(err) console.log(err);
//     else console.log("Connect Database Success !");
// });
// var db = new mssql.Request();

//------------Install Body Parser------------
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended:true}))



//-----------Start-------------
app.get('/', (req,res)=>{
    res.render('home');
})

app.get('/booking', (req,res)=>{
    res.render('book');
})

app.get('/pages/about-us', (req,res)=>{
    res.render('aboutUs');
})
app.get('/pages/privacy-policy', (req,res)=>{
    res.render('privacyPolicy');
})
app.get('/pages/terms-and-conditions', (req,res)=>{
    res.render('termconditions');
})
app.get('/pages/how-to-book', (req,res)=>{
    res.render('howtobook');
})
app.get('/pages/list-your-business', (req,res)=>{
    res.render('listyourbusiness');
})
app.get('/pages/payments-cancellation', (req,res)=>{
    res.render('paymentandcancellation');
})
app.get('/pages/service', (req,res)=>{
    res.render('service');
})

const mssql = require("mssql");
const config = {
    server:'101.99.13.2',
    database:'test',
    user:'sa',
    password:'z@GH7ytQ',
    options: {
        encrypt: false,
    }
}
mssql.connect(config,function (err) {
    if (err) console.log(err);
    else console.log("connect DB thanh cong");
});