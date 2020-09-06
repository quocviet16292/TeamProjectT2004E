// ------------Install Express----------------
const express = require("express");
const app = express();

//------------Port------------------
const port = process.env.PORT || 3000;
app.listen(port,()=>console.log("Server: http://localhost:3000"));

//------------View Engine EJS-----------------
app.set("view engine","ejs");

//------------Set Up static folder------------
app.use(express.static("public"));

const mssql = require("mssql");
// Load the fp build.
// var fp = require('lodash/fp');
// // Load a method category.
// var object = require('lodash/fp/object');
// // Load a single method for smaller builds with browserify/rollup/webpack.
// var extend = require('lodash/fp/extend');
const config = {
    server:"LAPTOP-QAOLFL7H\\SQLEXPRESS",
    user:"sa",
    password:"123",
    database:"BeautySalon",
    options:{
        encrypt:false
    }
};
//------------Install Body Parser------------
// const bodyParser = require("body-parser");
// app.use(bodyParser.urlencoded({extended:true}))

//Install MSSQL
// const mssql = require("mssql");
// const config = {
//     server:'101.99.13.2',
//     database:'test',
//     user:'sa',
//     password:'z@GH7ytQ',
//     options: {
//         encrypt: false,
//     }
// }
mssql.connect(config,function (err) {
    if (err) console.log(err);
    else console.log("connect DB thanh cong");
});
app.get("/",function (req,res) {
    res.render("home-son");
})

var db = new mssql.Request();

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));
app.post("/save-artist",function (req,res) {
    let name = req.body.aName;
    let ae = req.body.Email;
    let ap = req.body.Phone;
    let ad = req.body.District;
    let ac = req.body.City;
    let aa = req.body.Adress;
    let al = req.body.aLocation;
    let ai = req.body.Intro;
    let aav = req.body.Avartar;
    let aco = req.body.Cover;
    let ti = req.body.TimeRegis;
    let sql_text = "INSERT INTO Artist(aName,Email,Phone,District,City,Adress,aLocation,Intro,Avartar,Cover,TimeRegis) VALUES(N'"+name+"','"+ae+"','"+ap+"',N'"+ad+"',N'"+ac+"',N'"+aa+"',N'"+al+"',N'"+ai+"','"+aav+"',N'"+aco+"',N'"+aco+"')";
    db.query(sql_text,function (err,rows) {
        if(err) res.send(err);
        // else res.send("Them KH Thanh Cong");
        else res.redirect("/Registration-Services");
    })
})
app.get("/",function (req,res) {
    res.render('home-son');
});

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
app.get('/services', (req,res)=>{
    res.render('artistbeauty');
})
app.get('/beautydaily', (req,res)=>{
    res.render('blog');
})
app.get('/artist', (req,res)=>{
    res.render('service');
})

app.get("/Promotions",function (req,res) {
    res.render("navbar-Promotions-s");
})
app.get("/artisan-registration-and-service",function (req,res) {
    res.render("Re-Arsist-services-son");
})
app.get("/Gallery",function (req,res) {
    res.render("Gallery-s");
})
app.get("/Registration-Services",function (req,res) {
    res.render("Re-services-son");
})
app.get("/Registration-Artisan",function (req,res) {
    res.render("ResigArisist-son");
})
app.get("/artist-beauty",function (req,res) {
    res.render("artistbeauty");
})
app.get("/login",function (req,res) {
    res.render("H_login");
})
app.get("/services",function (req,res) {
    res.render("service");
})

app.post('/booking/success', (req,res)=>{
    res.render('success');
})