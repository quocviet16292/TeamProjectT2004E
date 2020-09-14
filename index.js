// ------------Install Express----------------
const express = require("express");
const app = express();

//------------Port------------------
const port = process.env.PORT || 3000;
app.listen(port,()=>console.log(`Server: http://localhost:${port}`));

//------------View Engine EJS-----------------
app.set("view engine","ejs");

//------------Set Up static folder------------
app.use(express.static("public"));



// Install MSSQL
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
app.get('/about-us', (req,res)=>{
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
        review: r.recordset

        // khachhang:kh,
        // donhang:donhang
    });
})


app.get("/Registration-Services",function (req,res) {
    res.render("Re-services-son");
})
app.get("/Registration-Artisan",function (req,res) {
    res.render("ResigArisist-son");
})
app.get("/BeautyArtist",function (req,res) {
    //lay du lieu
    db.query("select * from T2004E_Nhom1_VIEW_SEACH_Huy", function(err,rows){
        if(err)
            res.send(err);
        else
            res.render("artistbeauty",{
                artist:rows.recordset
            })
    })
});
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


//------------V
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
    let title = req.body.serviceTitle;
    let Art = req.body.artname;
    let sv ="";
    let sql_text = "SELECT * FROM T2004E_Nhom1_MU_Services WHERE SName IN (N'"+title+"')";
    await db.query(sql_text).then(rs=>{
        sv = rs
    })
    let sql_text1 = "SELECT * FROM T2004E_Nhom1_Artist WHERE Name LIKE N'"+Art+"'";
    let idArt ="";
    await db.query(sql_text1).then(rs=>{
        idArt = rs
    })
    let sql_text2 = "INSERT INTO T2004E_Nhom1_DonHang(Dkhang,DPhone,DEmail,DDate,DTime,DAdress,DTinh,DQuan,DThanhTien,DComment,Id)" +
        " VALUES(N'"+a+"','"+b+"','"+c+"','"+d+","+e+"',"+f+"',N'"+g+"',N'"+h+"',"+j+",N'"+k+"', "+idArt.Id+");SELECT SCOPE_IDENTITY() AS D_Id;";
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
