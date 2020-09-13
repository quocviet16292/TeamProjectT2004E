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

// const mssql = require("mssql");
// Load the fp build.
// var fp = require('lodash/fp');
// // Load a method category.
// var object = require('lodash/fp/object');
// // Load a single method for smaller builds with browserify/rollup/webpack.
// var extend = require('lodash/fp/extend');
// const config = {
//     server:"LAPTOP-QAOLFL7H\\SQLEXPRESS",
//     user:"sa",
//     password:"123",
//     database:"BeautySalon",
//     options:{
//         encrypt:false
//     }
// };
//------------Install Body Parser------------
// const bodyParser = require("body-parser");
// app.use(bodyParser.urlencoded({extended:true}))

//Install MSSQL
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

app.get('/pages/about-us', (req,res)=>{
    res.render('aboutUs');
})
app.get('/about', (req,res)=>{
    res.render('about');
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

// app.post('/booking/success', (req,res)=>{
//     res.render('success');
// })

app.post('/artisan-registration-and-service/success', (req,res)=>{
    res.render('regSuccess');
})

app.get('/booking/:serviceID', async (req,res)=>{
    let sID = req.params.serviceID;
    let sql_text = "SELECT * FROM T2004E_Nhom1_MU_Services WHERE S_Id = "+sID;
    let sql_text2 = "SELECT * FROM T2004E_Nhom1_MU_Services INNER JOIN T2004E_Nhom1_Artist ON T2004E_Nhom1_Artist.Id = T2004E_Nhom1_MU_Services.Id WHERE S_Id = "+sID;
    let sql_text3 = "EXEC v_services @ID = "+sID;
    let sql_text4 = "SELECT * FROM T2004E_Nhom1_City";
    let sql_text5 = "SELECT * FROM T2004E_Nhom1_District";
    let sv = "";
    let art = "";
    let allsv ="";
    let city ="";
    let district ="";
    await db.query(sql_text).then(rs=>{
        sv = rs;
    }).catch(function (err){
        console.log(err);
    })
    await db.query(sql_text2).then(rs=>{
        art = rs;
    }).catch(function (err){
        console.log(err);
    })
    await db.query(sql_text3).then(rs=>{
        allsv = rs;
    }).catch(function (err){
        console.log(err);
    })
    await db.query(sql_text4).then(rs=>{
        city = rs;
    }).catch(function (err){
        console.log(err);
    })
    await db.query(sql_text5).then(rs=>{
        district = rs;
    }).catch(function (err){
        console.log(err);
    })

    await res.render("book", {
        sps: sv.recordset,
        art: art.recordset,
        allsv: allsv.recordset,
        city: city.recordset,
        district: district.recordset
    });
})


app.post('/booking/success', async (req,res)=>{
    let a = req.body.Dkhang;
    let b = req.body.DPhone;
    let c = req.body.DEmail;
    let d = req.body.DDate;
    let e = req.body.DTime;
    let f = req.body.DAdress;
    let g = req.body.DTinh;
    let h = req.body.DQuan;
    let i = req.body.quantity;
    let j = req.body.DThanhTien;
    let k = req.body.DComment;
    let sID = req.params.serviceID;
    let sv ="";
    let sql_text = "SELECT * FROM T2004E_Nhom1_MU_Services INNER JOIN T2004E_Nhom1_Artist ON " +
        "T2004E_Nhom1_Artist.Id = T2004E_Nhom1_MU_Services.Id WHERE S_Id = "+sID;
    await db.query(sql_text).then(rs=>{
        sv = rs;
    })

    let sql_text2 = "INSERT INTO T2004E_Nhom1_DonHang(Dkhang,DPhone,DEmail,DDate,DTime,DAdress,DTinh,DQuan,DThanhTien,DComment,Id)" +
        " VALUES(N'"+a+"','"+b+"','"+c+"','"+d+","+e+"',"+f+"',N'"+g+"',N'"+h+"',"+j+",N'"+k+"', "+sv.Id+");SELECT SCOPE_IDENTITY() AS D_Id;";
    await db.query(sql_text2,function (err,rows) {
        let donhang = rows.recordsets[0];
        let MaSo = donhang.D_Id;
        let sql_text3 = "";
        sv.map(function (e) {
            sql_text3 += "INSERT INTO T2004E_Nhom1_DonHang_Services(D_Id,S_Id,SoLuong,ThanhTien) VALUES("+MaSo+","+e.S_Id+", 2,"+(e.SPrice*2)+");";
        })
        db.query(sql_text3,function (err,rows) {
            if(err) res.send(err);
            else res.redirect("/booking/success");
        })
    })
});
