
function emailValid(Email) {
    return /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(Email);
}
function save() {
    let fullname = document.getElementById('fullname').value;
    if (_.isEmpty(fullname)){
        document.getElementById('fullname-error').innerHTML = 'Please enter your first and last name';
    }else if (fullname.length < 6){
        document.getElementById('fullname-error').innerHTML = 'Name must not be less than 5 characters';
    }
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
    let Avartar = document.getElementById('Avartar').value;
    let Cover = document.getElementById('Cover').value;
    let SName = document.getElementById('SName').value;
    let SDescribe = document.getElementById('SDescribe').value;
    let SPrice = document.getElementById('SPrice').value;
    let SPromo = document.getElementById('SPromo').value;
    let SWTime = document.getElementById('SWTime').value;

    //Full name

    if (_.isEmpty(fullname)){
        fullname = '';
        document.getElementById('fullname-error').innerHTML = 'Please enter your first and last name';
    }else if(fullname.length <= 5){
        document.getElementById('fullname-error').innerHTML = 'Name must not be less than 5 characters';
    } else if(fullname.length > 30){
        document.getElementById('fullname-error').innerHTML = 'Name Must not exceed 30 characters';
    }
    else {
        document.getElementById('fullname-error').innerHTML = '';
    }

    //Email

    if (_.isEmpty(email)){
        email = '';
        document.getElementById('email-error').innerHTML = 'Vui Lòng Nhập email';
    }else if(!emailValid(email)){
        email = '';
        document.getElementById('email-error').innerHTML = 'email ko đúng định dạng';
    } else {
        document.getElementById('email-error').innerHTML = '';
    }

    //Phone

    if (_.isEmpty(phone)){
        phone = '';
        document.getElementById('phone-error').innerHTML = 'Vui Lòng Nhập số điện thoại';
    } else if (phone.trim().length >10){
        phone = '';
        document.getElementById('phone-error').innerHTML = 'sai số đt';
    }else if (phone.trim().length < 10){
        phone = '';
        document.getElementById('phone-error').innerHTML = 'sai số đt';
    }else {
        document.getElementById('phone-error').innerHTML = '';
    }

    //address
    if (_.isEmpty(address)){
        address = '';
        document.getElementById('address-error').innerHTML = 'Vui Lòng Nhập địa chỉ';
    }else {
        document.getElementById('address-error').innerHTML = '';
    }

    // sex

    if(fullname && email && phone &&address && gender){

        let students = localStorage.getItem('students') ?  JSON.parse(localStorage.getItem('students')) : [];

        students.push({
            fullname : fullname,
            email : email,
            phone : phone,
            address : address,
            gender : gender,
        });

        localStorage.setItem('students', JSON.stringify(students));
        this.renderListStudent();
    }
}




var currentTab = 0; // Current tab is set to be the first tab (0)
showTab(currentTab); // Display the current tab


function showTab(n) {
    var x = document.getElementsByClassName("vbooking__step");
    x[n].style.display = "block";
    if (n == 0) {
        document.getElementById("prevBtn").style.display = "none";
        // document.getElementById("nextBtn").setAttribute('onclick','getInfoStep1()');
    } else {
        document.getElementById("prevBtn").style.display = "inline";
    }
    if (n == (x.length - 1)) {
        document.getElementById("nextBtn").innerHTML = "CONFIRM <i class=\"fas fa-paper-plane\"></i>";

    } else {
        document.getElementById("nextBtn").innerHTML = "Next <i class=\"fas fa-chevron-right\">";
        document.getElementById("nextBtn").setAttribute('type','button');
    }
    fixStepIndicator(n)
}


function nextPrev(n) {
    var x = document.getElementsByClassName("vbooking__step");
    // if (n == 1 && !validateForm() && currentTab < 2) return false;
    x[currentTab].style.display = "none";
    currentTab = currentTab + n;
    if (currentTab >= x.length) {
        document.getElementById("bookForm").submit();
        return false;
    }
    showTab(currentTab);
}

function validateForm() {
    // This function deals with validation of the form fields
    var x, y, i, valid = true;
    x = document.getElementsByClassName("vbooking__step");
    y = x[currentTab].getElementsByTagName("input");
    for (i = 0; i < y.length; i++) {
        if (y[i].value == "") {
            y[i].className += " invalid";
            valid = false;
        }
    }
    // If the valid status is true, mark the step as finished and valid:
    if (valid) {
        document.getElementsByClassName("vbooking__step")[currentTab].className += " finish";
    }
    return valid; // return the valid status
}


function fixStepIndicator(n) {

    var x = document.getElementsByClassName("progress__step");
    for (let i = 0; i < x.length; i++) {
        x[i].className = x[i].className.replace(" active__step", "");
    }
    for(let j=0; j < n+1; j++){
        x[j].className += " active__step";
    }

}

// Remove Service Button
function removeItem(){
    let removeItemBtn = document.getElementsByClassName("btn__remove");
    for(let i=0; i < removeItemBtn.length; i++){

        let button = removeItemBtn[i];

        button.addEventListener('click',(event)=>{
            let buttonClicked = event.target;
            buttonClicked.parentElement.parentElement.parentElement.remove();
        })
    }
}

//Get Info and Print on the Step 4
function getInfoStep1(){
    document.getElementById('getCName').innerHTML = document.getElementById('Cname').value;
    document.getElementById('getCName1').innerHTML = document.getElementById('Cname').value;
    document.getElementById('getCity').innerHTML = document.getElementById('Ccity').options[document.getElementById('Ccity').selectedIndex].text + ", ";
    document.getElementById('getCity1').innerHTML = document.getElementById('Ccity').options[document.getElementById('Ccity').selectedIndex].text + ",  ";
    document.getElementById('getDistrict').innerHTML = document.getElementById('Cdistrict').options[document.getElementById('Cdistrict').selectedIndex].text;
    document.getElementById('getDistrict1').innerHTML = document.getElementById('Cdistrict').options[document.getElementById('Cdistrict').selectedIndex].text;
    document.getElementById('getCPhone').innerHTML = document.getElementById('Cphone').value;
    document.getElementById('getCPhone1').innerHTML = document.getElementById('Cphone').value;
    document.getElementById('getDate').innerHTML = document.getElementById('Cdate').value + " ";
    document.getElementById('getDate1').innerHTML = document.getElementById('Cdate').value + " ";
    document.getElementById('getTime').innerHTML = document.getElementById('Ctime').value;
    document.getElementById('getTime1').innerHTML = document.getElementById('Ctime').value;
    document.getElementById('getCEmail1').innerHTML = document.getElementById('Cemail').value;
}

// function sumCount(){
// let subtotal = document.getElementById('getSubtotal').innerText;
// let getItemList = document.getElementsByClassName('display__total');
let total = 0;
for(let i = 0; i < document.getElementsByClassName('display__total').length; i++){
    total += (parseFloat(document.getElementsByClassName('display__total')[i].innerText)*1000000);
    //Loi so thap phan
}
console.log(total);
// }
//
// sumCount();