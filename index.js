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
// app.use(bodyParser.json());



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

app.get("/login",function (req,res) {
    res.render("H_login");
})
app.get("/services",function (req,res) {
    res.render("service");
})



//------------------------------------------SON------------------------------------------------------------------

app.get("/Promotions",function (req,res) {
    res.render("navbar-Promotions-s");
})
app.get("/artisan-registration-and-service",function (req,res) {
    res.render("Re-Arsist-services-son");
})
app.get("/Gallery",function (req,res) {
    res.render("Gallery-s");
})

app.get("/map",function (req,res) {
    res.render("maps-son");
});

app.get("/dknghenhan",function (req,res) {
    res.render("DangkyNgheNhan");
});

app.get("/success-arists",function (req,res) {
    res.render("regSuccess");
});

app.get("/",function (req,res) {
    let sql_text = "SELECT * FROM view_home;SELECT * FROM T2004E_Nhom1_VIEW_NEW;SELECT * FROM T2004E_Nhom1_VIEW_RATING;SELECT * FROM T2004E_Nhom1_MU_Type;SELECT * FROM  T2004E_Nhom1_District WHERE Id IN ('001','002','003','005','006','007','008','009','019','021','268');";
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
    // console.log(sps);
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
    let key_search = "N'%"+req.query.keyword+"%'";
    db.query("SELECT * FROM T2004E_Nhom1_VIEW_SEACH_Huy_2 WHERE District LIKE "+key_search,function (err,rows) {
        if(err) res.send("Ko co ket qua");
        else
            // res.send(rows.recordset);
            res.render("artistbeauty",{
                artist: rows.recordset
            });
    });
});
app.get("/Promotion/ServicName/search",function (req,res) {
    let key_search = "N'%"+req.query.keyword+"%'";
    db.query("SELECT * FROM T2004E_Nhom1_VIEW_SEACH_Huy_3 WHERE SName LIKE "+key_search,function (err,rows) {
        if(err) res.send("Ko co ket qua");
        else
            // res.send(rows.recordset);
            res.render("artistbeauty",{
                artist: rows.recordset
            });
    });
});
app.get("/Promotion/Servis/search",function (req,res) {
    let key_search = "N'%"+req.query.keyword+"%'";
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
        "\t\tINNER JOIN T2004E_Nhom1_MU_Services c\n" +
        "\t\tON c.Id = a.Id\n" +
        "\t\tINNER JOIN T2004E_Nhom1_MU_Type b\n" +
        "\t\tON c.T_Id = b.T_Id\n" +
        "\t\tINNER JOIN T2004E_Nhom1_Portfolio_2 e\n" +
        "\t\tON e.P_Id = a.Id\n" +
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
    let sql_text1 = "SELECT  a.Name,a.District,a.Avartar,a.Cover,a.Phone,b.TName,a.Id,c.*,e.*,d.Id\n" +
        "        FROM T2004E_Nhom1_Artist a\n" +
        "        INNER JOIN T2004E_Nhom1_MU_Services c\n" +
        "        ON c.Id = a.Id\n" +
        "        INNER JOIN T2004E_Nhom1_MU_Type b\n" +
        "        ON c.T_Id = b.T_Id\n" +
        "        INNER JOIN T2004E_Nhom1_Portfolio_2 e\n" +
        "        ON e.P_Id = a.Id\n" +
        "\t\tINNER JOIN T2004E_Nhom1_District d\n" +
        "\t\tON d.Id =a.Id_District \n" +
        "        WHERE NOT EXISTS (SELECT * FROM T2004E_Nhom1_MU_Services cc WHERE cc.Id = c.Id AND cc.SPrice > c.SPrice) AND d.Id =" +arad;
    let add = "ko co";
    await db.query(sql_text1).then(rs=>{
        add = rs;
    }).catch(function (err) {
        console.log(err);
    });
    await res.render("artistbeauty",{
        artist: add.recordset,
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


// //---------------------------------------------NAM------------------------------------------


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













// CỦA HUYYYYYYYYYYYYY------------------------------------------------------------

app.get("/registet",function (req,res) {
    res.render("H_register")
})
app.get("/BeautyArtist",function (req,res) {
    db.query( "SELECT TOP 300 a.Name,a.District,a.Avartar,a.Cover,a.Phone,b.TName,a.Id,c.*,a.Id_District\n" +
        "        FROM T2004E_Nhom1_Artist a\n" +
        "        INNER JOIN T2004E_Nhom1_MU_Services c\n" +
        "        ON c.Id = a.Id\n" +
        "        INNER JOIN T2004E_Nhom1_MU_Type b\n" +
        "        ON c.T_Id = b.T_Id\n" +
        "INNER JOIN T2004E_Nhom1_District d\n" +
        "ON d.Id =a.Id_District \n" +
        "        WHERE NOT EXISTS (SELECT * FROM T2004E_Nhom1_MU_Services cc WHERE cc.Id = c.Id AND cc.SPrice > c.SPrice) \n" +
        "        ORDER BY a.Name DESC; ", function(err,rows){
        if(err)
            res.send("kog co ket qua");
        else
            // res.send(rows.recordset);  //trả về dữ liệu của database mk tryu vấn
            res.render("artistbeauty",{
                artist: rows.recordset
            })
    })
});
app.get("/search",function (req,res) {
    let key_district = "N'%"+ req.query.keyword+"%'";
    db.query("SELECT  a.Name,a.District,a.Avartar,a.Cover,a.Phone,b.TName,a.Id,c.*,a.Id_District\n" +
        "        FROM T2004E_Nhom1_Artist a\n" +
        "        INNER JOIN T2004E_Nhom1_MU_Services c\n" +
        "        ON c.Id = a.Id\n" +
        "        INNER JOIN T2004E_Nhom1_MU_Type b\n" +
        "        ON c.T_Id = b.T_Id\n" +
        "INNER JOIN T2004E_Nhom1_District d\n" +
        "ON d.Id =a.Id_District \n" +
        "        WHERE NOT EXISTS (SELECT * FROM T2004E_Nhom1_MU_Services cc WHERE cc.Id = c.Id AND cc.SPrice > c.SPrice) AND a.District LIKE  " + key_district,
        function(err,rows){
            if(err)
                res.send(err);
            else
                // res.send(rows.recordset);
                res.render("artistbeauty",{
                    artist: rows.recordset
                })
        })
});
app.get("/search_keyword/typemake_up",function (req,res) {
    let key_type ="'%"+ req.query.keyword1 + "%'";
    db.query("SELECT  a.Name,a.District,a.Avartar,a.Cover,a.Phone,b.TName,a.Id,c.*,a.Id_District\n" +
        "        FROM T2004E_Nhom1_Artist a\n" +
        "        INNER JOIN T2004E_Nhom1_MU_Services c\n" +
        "        ON c.Id = a.Id\n" +
        "        INNER JOIN T2004E_Nhom1_MU_Type b\n" +
        "        ON c.T_Id = b.T_Id\n" +
        "\t\tINNER JOIN T2004E_Nhom1_District d\n" +
        "\t\tON d.Id =a.Id_District \n" +
        "        WHERE NOT EXISTS (SELECT * FROM T2004E_Nhom1_MU_Services cc WHERE cc.Id = c.Id AND cc.SPrice > c.SPrice) AND b.TName LIKE " + key_type,
        function(err,rows){
            if(err)
                res.send(err);
            else
                // res.send(rows.recordset);
                res.render("artistbeauty",{
                    artist: rows.recordset
                })
        })
});
app.get("/sprice",function (req,res) {
    let max = req.query.max;
    db.query("SELECT  a.Name,a.District,a.Avartar,a.Cover,a.Phone,b.TName,a.Id,c.*,a.Id_District\n" +
        "        FROM T2004E_Nhom1_Artist a\n" +
        "        INNER JOIN T2004E_Nhom1_MU_Services c\n" +
        "        ON c.Id = a.Id\n" +
        "        INNER JOIN T2004E_Nhom1_MU_Type b\n" +
        "        ON c.T_Id = b.T_Id\n" +
        "\t\tINNER JOIN T2004E_Nhom1_District d\n" +
        "\t\tON d.Id =a.Id_District \n" +
        "        WHERE NOT EXISTS (SELECT * FROM T2004E_Nhom1_MU_Services cc WHERE cc.Id = c.Id AND cc.SPrice > c.SPrice) AND SPrice <= " + max, function (err, rows) {
        if (err) res.send(err);
        else
            // res.send(rows.recordset);
            res.render("artistbeauty", {
                artist: rows.recordset
            })
    })
});


//------------V----------------------------------------------------------------------------
app.get("/booking/success",function (req,res) {
    res.render("success");
});
app.get('/booking/:serviceID', async (req,res)=>{
    let sID = req.params.serviceID;
    let sname = req.query.serviceTitle;
    let sql_text = "SELECT * FROM T2004E_Nhom1_MU_Services WHERE S_Id = "+sID;
    let sql_text2 = "SELECT * FROM T2004E_Nhom1_MU_Services INNER JOIN T2004E_Nhom1_Artist ON T2004E_Nhom1_Artist.Id = T2004E_Nhom1_MU_Services.Id WHERE S_Id = "+sID;
    let sql_text3 = "EXEC v_services @ID = "+sID;
    let sql_text4 = "SELECT * FROM T2004E_Nhom1_City";
    let sql_text5 = "SELECT * FROM T2004E_Nhom1_District";
    let sql_text6 = "SELECT * FROM T2004E_Nhom1_MU_Services WHERE SName LIKE N'"+sname+"'";
    let sv = "";
    let art = "";
    let allsv ="";
    let city ="";
    let district ="";
    let svs ="";
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
    await db.query(sql_text6).then(rs=>{
        svs = rs;
    }).catch(function (err){
        console.log(err);
    })

    await res.render("book", {
        sps: sv.recordset,
        art: art.recordset,
        allsv: allsv.recordset,
        city: city.recordset,
        district: district.recordset,
        svs:svs.recordset
    });
})
app.post('/booking/success', (req,res)=> {
    console.log(req.body.title);

    res.render("success");
})


// app.post('/booking/success', async (req,res)=> {
//     let service = document.getElementsByClassName('service__title');
//     let selected = [];
//     service.map(e=>{
//         selected.push(e.textContent);
//     })
//     console.log(selected)
//     let a = req.body.Dkhang;
//     let b = req.body.DPhone;
//     let c = req.body.DEmail;
//     let d = req.body.DDate;
//     let e = req.body.DTime;
//     let f = req.body.DAdress;
//     let g = req.body.DTinh;
//     let h = req.body.DQuan;
//     let i = req.body.quantity;
//     let k = req.body.DComment;
//     let sv = "";
//     let sql_text = "SELECT * FROM T2004E_Nhom1_MU_Services WHERE SName IN ("+selected.join(', ')+")";
//     await db.query(sql_text).then(rs => {
//         sv = rs
//     })
//     let sql_text2 = "INSERT INTO T2004E_Nhom1_DonHang(Dkhang,DPhone,DEmail,DDate,DTime,DAdress,DTinh,DQuan,DThanhTien,DComment,Id)" +
//         " VALUES(N'" + a + "','" + b + "','" + c + "','" + d + "','" + e + "',N'" + f + "',N'" + g + "',N'" + h + "'," + sum + ",N'" + k + "', " + sv.Id + ");SELECT SCOPE_IDENTITY() AS D_Id;";
//     await db.query(sql_text2, function (err, rows) {
//         let donhang = rows.recordsets[0];
//         let MaSo = donhang.D_Id;
//         let sql_text3 = "";
//         sv.map(function (e) {
//             sql_text3 += "INSERT INTO T2004E_Nhom1_DonHang_Services(D_Id,S_Id,SoLuong,ThanhTien) VALUES(" + MaSo + "," + e.S_Id + ", 2," + (e.SPrice * 2) + ");";
//         })
//         db.query(sql_text3, function (err, rows) {
//             if (err) res.send(err);
//             else res.redirect("/booking/success");
//         })
//     })
// });
