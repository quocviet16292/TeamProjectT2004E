// localStorage.setItem('students','Nguyễn văn A')

// localStorage.getItem('students')

function emailValid(email) {
    return /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(email);
}

function save() {
    let fullname = document.getElementById('fullname').value;
    let email = document.getElementById('email').value;
    let phone = document.getElementById('phone').value;
    let address = document.getElementById('address').value;
    let gender = '';
    if (document.getElementById('male').checked){
        gender = document.getElementById('male').value;
    }else if(document.getElementById('famale').checked){
        gender = document.getElementById('famale').value;
    }

    //Full name

    if (_.isEmpty(fullname)){
        fullname = '';
        document.getElementById('fullname-error').innerHTML = 'Vui Lòng Nhập tên';
    }else if(fullname.length <=5){
        fullname = '';
        document.getElementById('fullname-error').innerHTML = 'Tên không được nhỏ hơn 5 ký tự';
    } else if(fullname.length >20){
        fullname = '';
        document.getElementById('fullname-error').innerHTML = 'Không được quá 20 ký tự';
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
    if (_.isEmpty(gender)){
        gender = '';
        document.getElementById('gender-error').innerHTML = 'Vui Lòng Nhập giới tính';
    }else {
        document.getElementById('gender-error').innerHTML = '';
    }

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

function renderListStudent() {
    // console.log('ok');
    let students = localStorage.getItem('students') ?  JSON.parse(localStorage.getItem('students')) : [];

    console.log(students.length)
    if (students.length === 0 ) {
        document.getElementById('list_student').style.display = 'none';
        return  false;
    }
    document.getElementById('list_student').style.display = 'block';
    let tableContent = `<tr>
                        <td>#</td>
                        <td>Họ Và Tên</td>
                        <td>Email</td>
                        <td>Số ĐT</td>
                        <td>Địa chỉ</td>
                        <td>Giới Tính</td>
                    </tr>`;

    students.forEach((student,index) =>{
        index ++;
        let genderlabel = parseInt(student.gender) === 1 ? 'Nam' : 'Nữ';
        tableContent += `<tr>
                        <td>${index}</td>
                        <td>${student.fullname}</td>
                        <td>${student.email}</td>
                        <td>${student.phone}</td>
                        <td>${student.address}</td>
                        <td>${genderlabel}</td>
                        <td>
                            <a href="#">Edit</a> | <a href="#">Delete</a>
                        </td>
                    </tr>`;
    })

    document.getElementById('gird_students').innerHTML = tableContent;
}
