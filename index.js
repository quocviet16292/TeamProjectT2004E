// ------------Install Express----------------
const express = require("express");
const app = express();

//------------Port------------------
const port = 5000;
app.listen(port,()=>console.log(`Server: http://localhost:${port}`));

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
    server:"DESKTOP-S30D2EK\\SQLEXPRESS",
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



var db = new mssql.Request();

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));

// app.get("/",function (req,res) {
//     res.render('home-son');
// });

//Của sơn
app.get("/Promotions",function (req,res) {
    res.render("navbar-Promotions-s");
})
app.get("/artisan-registration-and-service",function (req,res) {
    res.render("Re-Arsist-services-son");
})
app.get("/Gallery",function (req,res) {
    res.render("Gallery-s");
})

//Ko sơn
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


//CỦA SƠNNNNNNNNNNNNNNNNNNNNNNNNN

app.get("/map",function (req,res) {
    res.render("maps-son");
});



app.get("/",function (req,res) {

    let sql_text = "SELECT * FROM T2004E_Nhom1_VIEW_SALE_CHUAN;SELECT * FROM T2004E_Nhom1_VIEW_NEW;SELECT * FROM T2004E_Nhom1_VIEW_RATING;SELECT * FROM T2004E_Nhom1_MU_Type;";
    db.query(sql_text,function (err,rows) {
        if (err) res.send(err);
        else{
            res.render("home-son",{
                sps: rows.recordsets[0],
                aps: rows.recordsets[1],
                mps: rows.recordsets[2],
                vps: rows.recordsets[3],
            });
        }
    })
    // res.render("donhang");
})

app.get("/Promotion",function (req,res) {
    let sql_text = "" +
        "SELECT * FROM T2004E_Nhom1_VIEW_SALE_CHUAN_Promotion;";
    db.query(sql_text,function (err,rows) {
        if (err) res.send(err);
        else{
            res.render("Promotion-son",{
                sps: rows.recordset
            });
        }
    })
    // res.render("donhang");
})

app.get("/New-Arists",function (req,res) {
    let sql_text = "SELECT * FROM T2004E_Nhom1_VIEW_NEW_ARIST;";
    db.query(sql_text,function (err,rows) {
        if (err) res.send(err);
        else{
            res.render("New-Arists-son",{
                aps: rows.recordset
            });
        }
    })
    // res.render("donhang");
})

app.get("/Promotion/search",function (req,res) {

    let key_search = "'%"+req.query.keyword+"%'";
    db.query("SELECT * FROM T2004E_Nhom1_VIEW_SEACH WHERE District LIKE "+key_search,function (err,rows) {
        if(err) res.send("Ko co ket qua");
        else
            // res.send(rows.recordset);
            res.render("Promotion-son",{
                sps: rows.recordset
            });
    });
});
app.get("/Promotion/search-2",function (req,res) {

    let key_search = "'%"+req.query.keyword+"%'";
    db.query("SELECT * FROM T2004E_Nhom1_VIEW_SEACH WHERE TName LIKE "+key_search,function (err,rows) {
        if(err) res.send("Ko co ket qua");
        else
            // res.send(rows.recordset);
            res.render("Promotion-son",{
                sps: rows.recordset
            });
    });
});
app.get("/Promotion/search-3",function (req,res) {

    let key_search = "'%"+req.query.keyword+"%'";
    db.query("SELECT * FROM T2004E_Nhom1_VIEW_SEACH WHERE District LIKE N"+key_search,function (err,rows) {
        if(err) res.send("Ko co ket qua");
        else
            // res.send(rows.recordset);
            res.render("Promotion-son",{
                sps: rows.recordset
            });
    });
});


app.get("/Promotion/search/BaSic",function (req,res) {

    // let key_search = "'%"+req.query.keyword+"%'";
    db.query("SELECT * FROM T2004E_Nhom1_VIEW_SEACH WHERE TName LIKE '%BaSic%';",function (err,rows) {
        if(err) res.send("Ko co ket qua");
        else
            // res.send(rows.recordset);
            res.render("Promotion-son",{
                sps: rows.recordset
            });
    });
});
app.get("/Promotion/search/Wedding",function (req,res) {

    // let key_search = "'%"+req.query.keyword+"%'";
    db.query("SELECT * FROM T2004E_Nhom1_VIEW_SEACH WHERE TName LIKE '%Wedding%';",function (err,rows) {
        if(err) res.send("Ko co ket qua");
        else
            // res.send(rows.recordset);
            res.render("Promotion-son",{
                sps: rows.recordset
            });
    });
});
app.get("/Promotion/search/Photoshoot",function (req,res) {

    // let key_search = "'%"+req.query.keyword+"%'";
    db.query("SELECT * FROM T2004E_Nhom1_VIEW_SEACH WHERE TName LIKE '%Photoshoot%';",function (err,rows) {
        if(err) res.send("Ko co ket qua");
        else
            // res.send(rows.recordset);
            res.render("Promotion-son",{
                sps: rows.recordset
            });
    });
});
app.get("/Promotion/search/Bridesmaid",function (req,res) {

    // let key_search = "'%"+req.query.keyword+"%'";
    db.query("SELECT * FROM T2004E_Nhom1_VIEW_SEACH WHERE TName LIKE '%Bridesmaid%';",function (err,rows) {
        if(err) res.send("Ko co ket qua");
        else
            // res.send(rows.recordset);
            res.render("Promotion-son",{
                sps: rows.recordset
            });
    });
});
app.get("/Promotion/search/Traditional",function (req,res) {

    // let key_search = "'%"+req.query.keyword+"%'";
    db.query("SELECT * FROM T2004E_Nhom1_VIEW_SEACH WHERE TName LIKE '%Traditional%';",function (err,rows) {
        if(err) res.send("Ko co ket qua");
        else
            // res.send(rows.recordset);
            res.render("Promotion-son",{
                sps: rows.recordset
            });
    });
});
app.get("/Promotion/search/Character",function (req,res) {

    // let key_search = "'%"+req.query.keyword+"%'";
    db.query("SELECT * FROM T2004E_Nhom1_VIEW_SEACH WHERE TName LIKE '%Character%';",function (err,rows) {
        if(err) res.send("Ko co ket qua");
        else
            // res.send(rows.recordset);
            res.render("Promotion-son",{
                sps: rows.recordset
            });
    });
});
app.get("/Promotion/search/HaiBaTrung",function (req,res) {

    // let key_search = "'%"+req.query.keyword+"%'";
    db.query("SELECT * FROM T2004E_Nhom1_VIEW_SEACH WHERE District LIKE '%Hai%';",function (err,rows) {
        if(err) res.send("Ko co ket qua");
        else
            // res.send(rows.recordset);
            res.render("Promotion-son",{
                sps: rows.recordset
            });
    });
});
app.get("/Promotion/search/HoanKiem",function (req,res) {

    // let key_search = "'%"+req.query.keyword+"%'";
    db.query("SELECT * FROM T2004E_Nhom1_VIEW_SEACH WHERE District LIKE N'%Hoàn%';",function (err,rows) {
        if(err) res.send("Ko co ket qua");
        else
            // res.send(rows.recordset);
            res.render("Promotion-son",{
                sps: rows.recordset
            });
    });
});
app.get("/Promotion/search/HaDong",function (req,res) {

    // let key_search = "'%"+req.query.keyword+"%'";
    db.query("SELECT * FROM T2004E_Nhom1_VIEW_SEACH WHERE District LIKE N'%Hà%';",function (err,rows) {
        if(err) res.send("Ko co ket qua");
        else
            // res.send(rows.recordset);
            res.render("Promotion-son",{
                sps: rows.recordset
            });
    });
});
app.get("/Promotion/search/BaDinh",function (req,res) {

    // let key_search = "'%"+req.query.keyword+"%'";
    db.query("SELECT * FROM T2004E_Nhom1_VIEW_SEACH WHERE District LIKE N'%Ba%';",function (err,rows) {
        if(err) res.send("Ko co ket qua");
        else
            // res.send(rows.recordset);
            res.render("Promotion-son",{
                sps: rows.recordset
            });
    });
});
app.get("/Promotion/search/DongDa",function (req,res) {

    // let key_search = "'%"+req.query.keyword+"%'";
    db.query("SELECT * FROM T2004E_Nhom1_VIEW_SEACH WHERE District LIKE N'%Đống%';",function (err,rows) {
        if(err) res.send("Ko co ket qua");
        else
            // res.send(rows.recordset);
            res.render("Promotion-son",{
                sps: rows.recordset
            });
    });
});
app.get("/Promotion/search/CauGiay",function (req,res) {

    // let key_search = "'%"+req.query.keyword+"%'";
    db.query("SELECT * FROM T2004E_Nhom1_VIEW_SEACH WHERE District LIKE N'%Cầu%';",function (err,rows) {
        if(err) res.send("Ko co ket qua");
        else
            // res.send(rows.recordset);
            res.render("Promotion-son",{
                sps: rows.recordset
            });
    });
});
app.get("/Promotion/search/HoangMai",function (req,res) {

    // let key_search = "'%"+req.query.keyword+"%'";
    db.query("SELECT * FROM T2004E_Nhom1_VIEW_SEACH WHERE District LIKE N'%Hoàng%';",function (err,rows) {
        if(err) res.send("Ko co ket qua");
        else
            // res.send(rows.recordset);
            res.render("Promotion-son",{
                sps: rows.recordset
            });
    });
});
app.get("/Promotion/search/TayHo",function (req,res) {

    // let key_search = "'%"+req.query.keyword+"%'";
    db.query("SELECT * FROM T2004E_Nhom1_VIEW_SEACH WHERE District LIKE N'%Tây%';",function (err,rows) {
        if(err) res.send("Ko co ket qua");
        else
            // res.send(rows.recordset);
            res.render("Promotion-son",{
                sps: rows.recordset
            });
    });
});
app.get("/Promotion/search/NamTuLiem",function (req,res) {

    // let key_search = "'%"+req.query.keyword+"%'";
    db.query("SELECT * FROM T2004E_Nhom1_VIEW_SEACH WHERE District LIKE N'%Nam%';",function (err,rows) {
        if(err) res.send("Ko co ket qua");
        else
            // res.send(rows.recordset);
            res.render("Promotion-son",{
                sps: rows.recordset
            });
    });
});
app.get("/Promotion/search/BacTuLiem",function (req,res) {

    // let key_search = "'%"+req.query.keyword+"%'";
    db.query("SELECT * FROM T2004E_Nhom1_VIEW_SEACH WHERE District LIKE N'%Bắc%';",function (err,rows) {
        if(err) res.send("Ko co ket qua");
        else
            // res.send(rows.recordset);
            res.render("Promotion-son",{
                sps: rows.recordset
            });
    });
});
app.get("/Promotion/search/ThanhXuan",function (req,res) {

    // let key_search = "'%"+req.query.keyword+"%'";
    db.query("SELECT * FROM T2004E_Nhom1_VIEW_SEACH WHERE District LIKE N'%Thanh%';",function (err,rows) {
        if(err) res.send("Ko co ket qua");
        else
            // res.send(rows.recordset);
            res.render("Promotion-son",{
                sps: rows.recordset
            });
    });
});

app.get("/Promotion/promo-lowest",function (req,res) {

    db.query("SELECT * FROM T2004E_Nhom1_VIEW_SALE_CHUAN_Promotion_loswest",function (err,rows) {
        if(err) res.send("Ko co ket qua");
        else
            // res.send(rows.recordset);
            res.render("Promotion-son",{
                sps: rows.recordset
            });
    });
});
app.get("/Promotion/promo-hight",function (req,res) {

    db.query("SELECT * FROM T2004E_Nhom1_VIEW_SALE_CHUAN_Promotion_hight",function (err,rows) {
        if(err) res.send("Ko co ket qua");
        else
            // res.send(rows.recordset);
            res.render("Promotion-son",{
                sps: rows.recordset
            });
    });
});

app.get("/NewArtist/search",function (req,res) {

    let key_search = "'%"+req.query.keyword+"%'";
    db.query("SELECT * FROM T2004E_Nhom1_View_New_Ar_S2 WHERE District LIKE "+key_search,function (err,rows) {
        if(err) res.send("Ko co ket qua");
        else
            // res.send(rows.recordset);
            res.render("New-Arists-son",{
                aps: rows.recordset
            });
    });
});

app.get("/NewArtist/search/new-lowest",function (req,res) {

    db.query("SELECT * FROM T2004E_Nhom1_VIEW_NEW_ARIST_Nguoc;",function (err,rows) {
        if(err) res.send("Ko co ket qua");
        else
            // res.send(rows.recordset);
            res.render("New-Arists-son",{
                aps: rows.recordset
            });
    });
});

app.get("/NewArtist/search/new-hight",function (req,res) {

    db.query("SELECT * FROM T2004E_Nhom1_VIEW_NEW_ARIST;",function (err,rows) {
        if(err) res.send("Ko co ket qua");
        else
            // res.send(rows.recordset);
            res.render("New-Arists-son",{
                aps: rows.recordset
            });
    });
});
