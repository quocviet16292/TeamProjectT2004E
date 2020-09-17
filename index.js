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

// const config = {
//     server:"DESKTOP-S30D2EK\\SQLEXPRESS",
//     user:"sa",
//     password:"123",
//     database:"BeautySalon",
//     options:{
//         encrypt:false
//     }
// };
// ------------Install Body Parser------------

// const bodyParser = require("body-parser");
// app.use(bodyParser.urlencoded({extended:true}))

// Install MSSQL
// const mssql = require("mssql");
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



var db = new mssql.Request();

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));



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

app.get('/beautydaily', (req,res)=>{
    res.render('blog');
})
// app.get('/artist', (req,res)=>{
//     res.render('service');
// })


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
// app.get("/services",function (req,res) {
//     res.render("service");
// })

app.post('/booking/success', (req,res)=>{
    res.render('success');
})


//CỦA SƠNNNNNNNNNNNNNNNNNNNNNNNNN

app.get("/map",function (req,res) {
    res.render("maps-son");
});



app.get("/",function (req,res) {

    let sql_text = "SELECT TOP 8 a.Id_District,d.Id,a.Name,a.District,a.Avartar,a.Cover,b.TName,c.SWTime,c.SPrice,c.SPromo\n" +
        "\t\tFROM T2004E_Nhom1_Artist a\n" +
        "\t\tINNER JOIN T2004E_Nhom1_District d\n" +
        "\t\tON d.Id = a.Id_District\n" +
        "\t\tINNER JOIN T2004E_Nhom1_MU_Services c\n" +
        "\t\tON c.Id = a.Id\n" +
        "\t\tINNER JOIN T2004E_Nhom1_MU_Type b\n" +
        "\t\tON c.T_Id = b.T_Id\n" +
        "\n" +
        "\t\tWHERE NOT EXISTS (SELECT * FROM T2004E_Nhom1_MU_Services cc WHERE cc.Id = c.Id and cc.SPromo > c.SPromo) and c.SPromo IS NOT NULL\n" +
        "\t\tORDER BY c.SPromo DESC" +
        ";SELECT * FROM T2004E_Nhom1_VIEW_NEW;SELECT * FROM T2004E_Nhom1_VIEW_RATING;SELECT * FROM T2004E_Nhom1_MU_Type;" +
        "SELECT * FROM T2004E_Nhom1_District WHERE Id IN ('001','002','003','005','006','007','008','009','019','021','268');";
    db.query(sql_text,function (err,rows) {
        if (err) res.send(err);
        else{
            res.render("home-son",{
                sps: rows.recordsets[0],
                aps: rows.recordsets[1],
                mps: rows.recordsets[2],
                vps: rows.recordsets[3],
                dps: rows.recordsets[4],
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

app.get("/Promotion/District/search",function (req,res) {

    let key_search = "'%"+req.query.keyword+"%'";
    db.query("SELECT * FROM T2004E_Nhom1_VIEW_SEACH_Huy_2 WHERE District LIKE "+key_search,function (err,rows) {
        if(err) res.send("Ko co ket qua");
        else
            // res.send(rows.recordset);
            res.render("artistbeauty",{
                artist: rows.recordset
            });
    });
});
app.get("/Promotion/Servis/search",function (req,res) {

    let key_search = "'%"+req.query.keyword+"%'";
    db.query("SELECT * FROM T2004E_Nhom1_VIEW_SEACH_Huy_2 WHERE TName LIKE "+key_search,function (err,rows) {
        if(err) res.send("Ko co ket qua");
        else
            // res.send(rows.recordset);
            res.render("artistbeauty",{
                artist: rows.recordset
            });
    });
});

app.get("/Promotion/servic/:id",async function (req,res) {
    let arad = req.params.id;
    let sql_text1 = "SELECT top 300 a.Name,a.District,a.Avartar,a.Cover,a.Phone,b.TName,b.T_Id,c.SWTime,c.SPromo,e.*\n" +
        "\t\tFROM T2004E_Nhom1_Artist a\n" +
        "\t\tFULL JOIN T2004E_Nhom1_MU_Services c\n" +
        "\t\tON c.Id = a.Id\n" +
        "\t\tFULL JOIN T2004E_Nhom1_MU_Type b\n" +
        "\t\tON c.T_Id = b.T_Id\n" +
        "\t\tFULL JOIN T2004E_Nhom1_Portfolio_2 e\n" +
        "\t\ton e.P_Id = a.Id\n" +
        "\t\tWHERE  NOT EXISTS (SELECT * FROM T2004E_Nhom1_MU_Services cc WHERE cc.Id = c.Id AND cc.SPrice > c.SPrice) AND b.T_Id =" +arad;
    let add = "ko co";
    await db.query(sql_text1).then(rs=>{
        add = rs;
    }).catch(function (err) {
        console.log(err);
    });
    await res.render("artistbeauty",{
        artist: add.recordset
    });
})

app.get("/Promotion/District/:id",async function (req,res) {
    let arad = req.params.id;
    let sql_text1 = "SELECT TOP 200 a.Id_District,a.Name,a.District,a.Avartar,a.Cover,a.Phone,b.TName,b.T_Id,c.SWTime,c.SPromo,e.*,d.Name,d.Id\n" +
        "\t\tFROM T2004E_Nhom1_Artist a\n" +
        "\t\tFULL JOIN T2004E_Nhom1_MU_Services c\n" +
        "\t\tON c.Id = a.Id\n" +
        "\t\tFULL JOIN T2004E_Nhom1_MU_Type b\n" +
        "\t\tON c.T_Id = b.T_Id\n" +
        "\t\tFULL JOIN T2004E_Nhom1_Portfolio_2 e\n" +
        "\t\tON e.P_Id = a.Id\n" +
        "\t\tFULL JOIN T2004E_Nhom1_District d\n" +
        "\t\tON d.Id =a.Id_District\n" +
        "\t\tWHERE  NOT EXISTS (SELECT * FROM T2004E_Nhom1_MU_Services cc WHERE cc.Id = c.Id AND cc.SPrice > c.SPrice) AND a.Id_District =" +arad;
    let add = "ko co";
    await db.query(sql_text1).then(rs=>{
        add = rs;
    }).catch(function (err) {
        console.log(err);
    });
    await res.render("artistbeauty",{
        artist: add.recordsets
    });
})

app.get("/Promotion/search/lowest",function (req,res) {

    db.query("SELECT * FROM T2004E_Nhom1_VIEW_SALE_CHUAN_Promotion_loswest",function (err,rows) {
        if(err) res.send("Ko co ket qua");
        else
            // res.send(rows.recordset);
            res.render("Promotion-son",{
                sps: rows.recordset
            });
    });
});
app.get("/Promotion/search/hight",function (req,res) {

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
    db.query("SELECT * FROM T2004E_Nhom1_VIEW_NEW_ARIST WHERE District LIKE "+key_search,function (err,rows) {
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



//của nam
// app.get("/BeautyArtist",function (req,res) {
//     //lay du lieu
//     db.query("select PImageClient, T2004E_Nhom1_Artist.* from T2004E_Nhom1_Artist\n" +
//         "inner join T2004E_Nhom1_Portfolio on T2004E_Nhom1_Artist.Id = T2004E_Nhom1_Portfolio.P_Id\n" +
//         "order by Name asc;select top 5 PImageClient from T2004E_Nhom1_Portfolio \n" +
//         "inner join T2004E_Nhom1_Artist\n" +
//         "on T2004E_Nhom1_Portfolio.P_Id = T2004E_Nhom1_Artist.Id",
//         function(err,rows){
//             if(err)
//                 res.send("kog co ket qua");
//             else
//                 res.send(rows.recordset);  //trả về dữ liệu của database mk tryu vấn
//
//             // res.render("artistbeauty",{
//             //     artist:rows.recordsets[0],
//             //     img:rows.recordsets[1]
//             // })
//         })
// });

app.get("/service/:id",async function (req,res) {
    let aid = req.params.id;
    let artist = "select * from T2004E_Nhom1_Artist WHERE Id ="+aid;
    let a = "ko co";

    await db.query(artist).then(rs=>{
        a = rs;
    }).catch(function (err) {
        console.log(err);
    });
    let service = "select * from T2004E_Nhom1_MU_Services\n" +
        "inner join T2004E_Nhom1_Artist\n" +
        "on T2004E_Nhom1_MU_Services.Id=T2004E_Nhom1_Artist.Id\n" +
        "inner join T2004E_Nhom1_MU_Type\n" +
        "on T2004E_Nhom1_MU_Services.T_Id = T2004E_Nhom1_MU_Type.T_Id\n" +
        "where T2004E_Nhom1_Artist.Id = "+aid;
    let s = [];
    await db.query(service).then(rs=>{
        s = rs;
    }).catch(function (err) {
        console.log(err);
    });
    // await res.send(a);
    let portfolio = "select * from T2004E_Nhom1_Portfolio where P_Id ="+aid;
    let p = [];
    await db.query(portfolio).then(rs=>{
        p = rs;
    }).catch(function (err) {
        console.log(err);
    });
    let review = "select * from T2004E_Nhom1_Review WHERE R_Id="+aid;
    let r = [];
    await db.query(review).then(rs=>{
        r = rs;
    }).catch(function (err) {
        console.log(err);
    });
    await res.render("service",{
        artist: a.recordset,
        service: s.recordset,
        portfolio: p.recordset,
        review: r.recordset,

        // khachhang:kh,
        // donhang:donhang
    });
})

app.get("/service",function (req,res) {
    //lay du lieu
    db.query("select * from T2004E_Nhom1_MU_Services\n" +
        "inner join T2004E_Nhom1_Artist\n" +
        "on T2004E_Nhom1_MU_Services.Id=T2004E_Nhom1_Artist.Id\n" +
        "inner join T2004E_Nhom1_MU_Type\n" +
        "on T2004E_Nhom1_MU_Services.T_Id = T2004E_Nhom1_MU_Type.T_Id\n" +
        "where T2004E_Nhom1_Artist.Id = 3;select * from T2004E_Nhom1_Artist where Id=3;" +
        "select * from T2004E_Nhom1_Portfolio where P_Id = 3\n",
        function(err,rows){
            if(err)
                res.send("kog co ket qua");
            else
                // res.send(rows.recordset);  //trả về dữ liệu của database mk tryu vấn

                res.render("service",{
                    service:rows.recordsets[0],
                    artist:rows.recordsets[1],
                    portfolio:rows.recordsets[2]
                })
        })
});



//

// CỦA HUYYYYYYYYYYYYY

app.get("/BeautyArtist",function (req,res) {


    db.query( "select * from T2004E_Nhom1_VIEW_SEACH_Huy_1;", function(err,rows){
        if(err)
            res.send("kog co ket qua");
        else
            // res.send(rows.recordset);  //trả về dữ liệu của database mk tryu vấn

            res.render("artistbeauty",{
                artist:rows.recordset

            })
    })
});




