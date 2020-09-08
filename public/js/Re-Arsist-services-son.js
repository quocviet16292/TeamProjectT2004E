// Progress Bar and Step Form

function emailValid(Email) {
    return /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(Email);
}

function save() {
    let fullname = document.getElementById('Cname').value;
    let Email = document.getElementById('Cemail').value;
    let Phone = document.getElementById('Cphone').value;
    let Address = document.getElementById('Address').value;
    let City = document.getElementById('Ccity').value;
    let District = document.getElementById('Cdistrict').value;
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
            Phone : Phone,
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

    if(n == 1 && !validateForm()) return false;
    // if(n == 1 && !savess()) return false;

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


//Get Info and Print on the Step 4
function getInfoStep1(){
    document.getElementById('getCName').innerHTML = document.getElementById('Cname').value;
    document.getElementById('getCName1').innerHTML = document.getElementById('Cname').value;
    document.getElementById('getCEmail1').innerHTML = document.getElementById('Cemail').value;
    document.getElementById('getCPhone').innerHTML = document.getElementById('Cphone').value;
    document.getElementById('getCPhone1').innerHTML = document.getElementById('Cphone').value;
    document.getElementById('getAddress1').innerHTML = document.getElementById('Address').value + " ";
    document.getElementById('getCity1').innerHTML = document.getElementById('Ccity').value;
    document.getElementById('getDistrict1').innerHTML = document.getElementById('Cdistrict').value + " ";
    document.getElementById('getDistrict').innerHTML = document.getElementById('Cdistrict').value + " ";
    document.getElementById('getCity').innerHTML = document.getElementById('Ccity').value;
    document.getElementById('getCEmail').innerHTML = document.getElementById('Cemail').value;

}

let total = 0;
for(let i = 0; i < document.getElementsByClassName('display__total').length; i++){
    total += (parseFloat(document.getElementsByClassName('display__total')[i].innerText)*1000000);
    //Loi so thap phan
}
console.log(total);


function save2() {
    let SName = document.getElementById('SName').value;
    let SDescribe = document.getElementById('SDescribe').value;
    let SPrice = document.getElementById('SPrice').value;
    let SPromo = document.getElementById('SPromo').value;
    let SWTime = document.getElementById('SWTime').value;
        let students = localStorage.getItem('services') ?  JSON.parse(localStorage.getItem('students')) : [];
        let students2 = localStorage.getItem('services') ?  JSON.parse(localStorage.getItem('students')) : [];
        students.push({
            SName : SName,
            SDescribe : SDescribe,
            SPrice : SPrice,
            SPromo : SPromo,
            SWTime : SWTime,
        });
        localStorage.setItem('students', JSON.stringify(students));
    students2.push({
        SName : SName,
        SDescribe : SDescribe,
        SPrice : SPrice,
        SPromo : SPromo,
        SWTime : SWTime,
    });
    localStorage.setItem('students2', JSON.stringify(students2));
        this.renderListStudent();
        this.renderListStudent2();
}
function renderListStudent() {
    let students = localStorage.getItem('students') ?  JSON.parse(localStorage.getItem('students')) : [];

    if (students.length === 0 ) {
        document.getElementById('list_student').style.display = 'none';
        return  false;
    }
    document.getElementById('list_student').style.display = 'block';
    let tableContent = `<tr>
                        <td class="col list_student-1">#</td>
                        <td class="col list_student-2">Services Name</td>
                        <td class="col list_student-3">Service prices</td>
                        <td class="col list_student-4">Promotion</td>
                        <td class="col list_student-5">Promotion time</td>
                        <td class="col list_student-6">Action</td>
                    </tr>`;

    students.forEach((student,index) =>{
        let studentId = index;
        index ++;
        tableContent += `<tr>
                        <td class="list_student-0">${index}</td>
                        <td class="list_student-0">${student.SName}</td>
                        <td class="list_student-0">${student.SPrice}</td>
                        <td class="list_student-0">${student.SPromo}</td>
                        <td class="list_student-0">${student.SWTime}</td>
                        <td class="list_student-0">
                            <a href="#" class="list_student-a">Edit</a> | <a href="#" ONCLICK='deleteStudent(${studentId})' class="list_student-a">Delete</a>
                        </td>
                    </tr>`;
    })

    document.getElementById('gird_students').innerHTML = tableContent;
}

function renderListStudent2() {
    let students2 = localStorage.getItem('students2') ?  JSON.parse(localStorage.getItem('students2')) : [];

    if (students2.length === 0 ) {
        document.getElementById('list_student2').style.display = 'none';
        return  false;
    }
    document.getElementById('list_student2').style.display = 'block';
    let tableContent = `<tr>
                        <td class="col list_student-1">#</td>
                        <td class="col list_student-2">Services Name</td>
                        <td class="col list_student-3">Service prices</td>
                        <td class="col list_student-4">Promotion</td>
                        <td class="col list_student-5">Promotion time</td>
                        <td class="col list_student-6">Action</td>
                    </tr>`;

    students2.forEach((student2,index) =>{
        let studentId2 = index;
        index ++;
        tableContent += `<tr>
                        <td class="list_student-0">${index}</td>
                        <td class="list_student-0">${student2.SName}</td>
                        <td class="list_student-0">${student2.SPrice}</td>
                        <td class="list_student-0">${student2.SPromo}</td>
                        <td class="list_student-0">${student2.SWTime}</td>
                        <td class="list_student-0">
                            <a href="#" class="list_student-a">Edit</a> | <a href="#" ONCLICK='deleteStudent2(${studentId2})' class="list_student-a">Delete</a>
                        </td>
                    </tr>`;
    })

    document.getElementById('gird_students2').innerHTML = tableContent;
}


function deleteStudent(id) {
    let students = localStorage.getItem('students') ?  JSON.parse(localStorage.getItem('students')) : [];
    students.splice(id, 1);
    localStorage.setItem('students', JSON.stringify(students));
    renderListStudent();
}
function deleteStudent2(id) {
    let students2 = localStorage.getItem('students2') ?  JSON.parse(localStorage.getItem('students2')) : [];
    students2.splice(id, 1);
    localStorage.setItem('students2', JSON.stringify(students2));
    renderListStudent2();
}


function savess() {
    let SName = document.getElementById('SName').value;
    let SDescribe = document.getElementById('SDescribe').value;
    let SPrice = document.getElementById('SPrice').value;
    let SPromo = document.getElementById('SPromo').value;
    let SWTime = document.getElementById('SWTime').value;
    let checkBoxs = document.getElementById('checkBoxs').checked;
    if (_.isEmpty(SName)){
        document.getElementById('SName-error').innerHTML = 'Not yet selected service';
    }else{
        document.getElementById('SName-error').innerHTML = '';
    }

    if (_.isEmpty(SDescribe)){
        document.getElementById('SDescribe-error').innerHTML = 'no service description yet';
    }else{
        document.getElementById('SDescribe-error').innerHTML = '';
    }

    if (_.isEmpty(SPrice)){
        document.getElementById('SPrice-error').innerHTML = 'haven\'t entered the amount yet';
    }else{
        document.getElementById('SPrice-error').innerHTML = '';
    }

    if (_.isEmpty(SPrice)){
        document.getElementById('SPrice-error').innerHTML = 'haven\'t entered the amount yet';
    }else{
        document.getElementById('SPrice-error').innerHTML = '';
    }
    if (!_.isEmpty(SPromo)){
        if (_.isEmpty(SWTime)){
            document.getElementById('SWTime-error').innerHTML = 'haven\'t entered the amount yet';
        }else{
            document.getElementById('SWTime-error').innerHTML = '';
        }
    }

    if (_.isEmpty(checkBoxs)){
        document.getElementById('checkBoxs-error').innerHTML = 'You do not agree to the terms';
    }else{
        document.getElementById('checkBoxs-error').innerHTML = '';
    }
}

function valiDateFrom2() {
    let fullname = document.getElementById('Cname').value;
    let Email = document.getElementById('Cemail').value;
    let Phone = document.getElementById('Cphone').value;
    let Address = document.getElementById('Address').value;
    let City = document.getElementById('Ccity').value;
    let District = document.getElementById('Cdistrict').value;
    let aLocation = document.getElementById('aLocation').value;
    let Intro = document.getElementById('Intro').value;
    let SName = document.getElementById('SName').value;
    let SDescribe = document.getElementById('SDescribe').value;
    let SPrice = document.getElementById('SPrice').value;
    let SPromo = document.getElementById('SPromo').value;
    let SWTime = document.getElementById('SWTime').value;
    //name a
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

}