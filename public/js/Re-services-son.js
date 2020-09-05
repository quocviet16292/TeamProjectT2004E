function save() {
    let SName = document.getElementById('SName').value;
    let SDescribe = document.getElementById('SDescribe').value;
    let SPrice = document.getElementById('SPrice').value;
    let SPromo = document.getElementById('SPromo').value;
    let SWTime = document.getElementById('SWTime').value;

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
    if (!_.isEmpty(SPromo)){
        if (_.isEmpty(SWTime)){
            document.getElementById('SWTime-error').innerHTML = 'haven\'t entered the amount yet';
        }else{
            document.getElementById('SWTime-error').innerHTML = '';
        }
    }

    if(SName && SDescribe && SPrice && SPromo && SWTime){

        let students = localStorage.getItem('services') ?  JSON.parse(localStorage.getItem('students')) : [];

        students.push({
            SName : SName,
            SDescribe : SDescribe,
            SPrice : SPrice,
            SPromo : SPromo,
            SWTime : SWTime,
        });
        localStorage.setItem('students', JSON.stringify(students));
        this.renderListStudent();
    }
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

function deleteStudent(id) {
    let students = localStorage.getItem('students') ?  JSON.parse(localStorage.getItem('students')) : [];
    students.splice(id, 1);
    localStorage.setItem('students', JSON.stringify(students));
    renderListStudent();
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
