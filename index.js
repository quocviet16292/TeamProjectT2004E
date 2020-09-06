const express = require("express")
const app = express();
const PORT = process.env.PORT || 5000;
app.listen(PORT,function () {
    console.log("sever is running...");
});
app.use(express.static("public"));
app.set("view engine","ejs");
const mssql = require("mssql");
// Load the fp build.
var fp = require('lodash/fp');

// Load a method category.
var object = require('lodash/fp/object');

// Load a single method for smaller builds with browserify/rollup/webpack.
var extend = require('lodash/fp/extend');

const config = {
    server:"DESKTOP-S30D2EK\\SQLEXPRESS",
    user:"sa",
    password:"123",
    database:"BeautySalon",
    options:{
        encrypt:false
    }
};
mssql.connect(config,function (err) {
    if(err) console.log(err);
    else console.log("connect BD thanh cong")
})

// app.get("/",function (req,res) {
//     res.render("home-son");
// })
app.get("/qlsv",function (req,res) {
    res.render("qlsv");
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

var db = new mssql.Request();
app.get("/",function (req,res) {
    //res.send("Day la trang chu!");
    //láy dữ liệu
    db.query("SELECT * FROM VIEW_SALE;SELECT * FROM View_New_Ar;SELECT * FROM view_thang",function (err,rows) {
        if(err) res.send("Ko co ket qua");
        else
            // res.send(rows.recordset);
            res.render("home-son",{
                sps: rows.recordsets[0],
                aps: rows.recordsets[1],
                mps: rows.recordsets[2]
            });
    });
    // res.render("home");
    //
});
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

    let sql_text = "INSERT INTO Artist(aName,Email,Phone,District,City,Adress,aLocation,Intro,Avartar,Cover,TimeRegis) VALUES(N'"+name+"','"+ae+"','"+ap+"',N'"+ad+"',N'"+ac+"',N'"+aa+"',N'"+al+"',N'"+ai+"','"+aav+"',N'"+aco+"',GETDATE())";
    db.query(sql_text,function (err,rows) {
        if(err) res.send(err);
        // else res.send("Them KH Thanh Cong");
        else res.redirect("/Registration-Services");
    })
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

