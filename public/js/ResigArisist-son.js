
function emailValid(Email) {
    return /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(Email);
}

function save() {
    let fullname = document.getElementById('fullname').value;
    let Email = document.getElementById('Email').value;
    let Phone = document.getElementById('Phone').value;
    let Address = document.getElementById('Address').value;
    let City = document.getElementById('City').value;
    let District = document.getElementById('District').value;
    let aLocation = document.getElementById('aLocation').value;
    let Intro = document.getElementById('Intro').value;

    //full name

    if (_.isEmpty(fullname)){
        fullname = '';
        document.getElementById('fullname-error').innerHTML = 'Please enter your first and last name';
    }else if (fullname.length < 6 ){
       fullname = '';
        document.getElementById('fullname-error').innerHTML = 'Name must not be less than 5 characters';
    }else if (fullname.length >30 ){
       fullname = '';
        document.getElementById('fullname-error').innerHTML = 'Name Must not exceed 30 characters';
    }else{
        document.getElementById('fullname-error').innerHTML = '';
    }

    //email

    if (_.isEmpty(Email)){
        Email = '';
        document.getElementById('Email-error').innerHTML = 'Please update your email';
    }else if (!emailValid(Email)){
        Email = '';
        document.getElementById('Email-error').innerHTML = 'Email invalidate';
    }else {
            document.getElementById('email-error').innerHTML = '';
        }

    //phone

    if (_.isEmpty(Phone)){
        Phone = '';
            document.getElementById('Phone-error').innerHTML = 'Please enter the phone number';
        } else if (Phone.trim().length >10){
        Phone = '';
            document.getElementById('Phone-error').innerHTML = 'Wrong phone number';
        }else if (phone.trim().length < 10){
        Phone = '';
            document.getElementById('Phone-error').innerHTML = 'Wrong phone number';
        }else {
            document.getElementById('Phone-error').innerHTML = '';
        }

    //Adresss

    if (_.isEmpty(Address)){
        Address = '';
        document.getElementById('Address-error').innerHTML = 'Please enter your address';
    }else {
        document.getElementById('Address-error').innerHTML = '';
    }

    //City
    if (_.isEmpty(City)){
        City = '';
        document.getElementById('City-error').innerHTML = 'Please enter a city';
    }else {
        document.getElementById('City-error').innerHTML = '';
    }
    //Dictric

    if (_.isEmpty(District)){
        District = '';
        document.getElementById('District-error').innerHTML = 'Please enter the District';
    }else {
        document.getElementById('District-error').innerHTML = '';
    }

    //alocation

    if (_.isEmpty(aLocation)){
        aLocation = '';
        document.getElementById('aLocation-error').innerHTML = 'Please enter Location';
    }else {
        document.getElementById('aLocation-error').innerHTML = '';
    }

    //alocation

    if (_.isEmpty(Intro)){
        Intro = '';
        document.getElementById('Intro-error').innerHTML = 'Please enter Intro';
    }else {
        document.getElementById('Intro-error').innerHTML = '';
    }


    if(fullname && Email && Phone &&Address && City && District && aLocation && Intro){

        let addsevices = localStorage.getItem('addsevices') ?  JSON.parse(localStorage.getItem('addsevices')) : [];

        addsevices.push({
            fullname : fullname,
            Email : Email,
            Phone : phone,
            Address : Address,
            City : City,
            District : District,
            aLocation : aLocation,
            Intro : Intro,
        });

        localStorage.setItem('addsevices', JSON.stringify(addsevices));
        this.renderListServices();
    }
}

// function addServices() {
//     let SName = document.getElementById('SName').value;
//     let SDescribe = document.getElementById('SDescribe').value;
//     let SPrice = document.getElementById('SPrice').value;
//
//     //Sname
//
//     if (_.isEmpty(SName)){
//         SName = '';
//         document.getElementById('SName-error').innerHTML = 'Please enter Services';
//     }else {
//         document.getElementById('SName-error').innerHTML = '';
//     }
//
//     //Describe
//     if (_.isEmpty(SDescribe)){
//         SDescribe = '';
//         document.getElementById('SDescribe-error').innerHTML = 'Please enter tittel';
//     }else {
//         document.getElementById('SDescribe-error').innerHTML = '';
//     }
//
//     //SPrice
//     if (_.isEmpty(SPrice)){
//         SPrice = '';
//         document.getElementById('SPrice-error').innerHTML = 'Please enter Monney';
//     }else {
//         document.getElementById('SPrice-error').innerHTML = '';
//     }
//
//
//     let addsevices = localStorage.getItem('addsevices') ?  JSON.parse(localStorage.getItem('addsevices')) : [];
//
//     addsevices.push({
//         fullname : fullname,
//         Email : Email,
//         Phone : phone,
//         Address : Address,
//         City : City,
//         District : District,
//         aLocation : aLocation,
//         Intro : Intro,
//         SName : SName,
//         SDescribe : SDescribe,
//         SPrice : SPrice,
//         SPromo : SPromo,
//         SWTime : SWTime
//     });
//
//     localStorage.setItem('addsevices', JSON.stringify(addsevices));
//     this.renderListServices();
// }
// function renderListServices() {
//     // console.log('ok');
//     let addsevices = localStorage.getItem('addsevices') ?  JSON.parse(localStorage.getItem('addsevices')) : [];
//
//     // console.log(addsevices.length)
//     if (addsevices.length === 0 ) {
//         document.getElementById('list_services').style.display = 'none';
//         return  false;
//     }
//     document.getElementById('list_services').style.display = 'block';
//     let tableContent = `<tr>
//                         <td>#</td>
//                         <td>Services Name</td>
//                         <td>Price</td>
//                         <td>Promotion</td>
//                         <td>Promotion end time</td>
//                     </tr>`;
//
//     addsevices.forEach((addsevices,index) =>{
//         index ++;
//         tableContent += `<tr>
//                         <td>${index}</td>
//                         <td>${addsevices.SName}</td>
//                         <td>${addsevices.SPrice}</td>
//                         <td>${addsevices.SPromo}</td>
//                         <td>${addsevices.SWTime}</td>
//                         <td>
//                             <a href="#">Edit</a> | <a href="#">Delete</a>
//                         </td>
//                     </tr>`;
//     })
//
//     document.getElementById('gird_services').innerHTML = tableContent;
// }



