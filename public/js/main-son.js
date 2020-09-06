'use strict';

var students = [
  {
    name: 'Cao Viet Ha',
    age: 14,
    phone: 1234567890,
    address: 'Ha Noi, Viet Nam'
  },
  {
    name: 'Nguyen Thuy Duong',
    age: 14,
    phone: 1234567890,
    address: 'Hai Phong, VN'
  }
]
var editMode = false;
var studentIdTmp;

// document ready
document.addEventListener('DOMContentLoaded', function() {
  renderStudents();

  // Anh đã tạo ra 1 file `validation.js` để viết riêng code cho việc
  // validation cho nó gọn gàng
  // Và anh đã thêm: <script type="text/javascript" src="js/validation.js"></script>
  // vào file `index.html` rồi

  // Khỏi tạo cấu hình validation
  // Truyền thông tin của các trường muốn validation vào
  // Tham số truyền vào là 1 mảng chứa các object
  // => mỗi object chứa thông tin cho 1 trường cần validation
  // `validation` này anh định nghĩa bên file `validation.js`
  validation.init([
    {
      selector: '.Cname', // <-- selector của thẻ input muốn validation
      name: 'aName', // <-- tên gọi của thẻ input muốn validation
      type: 'text', // <-- kiểu muốn validation
      min: 6, // <-- độ dài tối thiểu cho phép ( không nhập thì mặc định là 1 )
      max: 32 // <-- độ dài tối đa cho phép ( không nhập thì mặc định là 255 )
    },
    {
      selector: '.age',
      name: 'age',
      type: 'number'
    },
    {
      selector: '.phone',
      name: 'phone',
      type: 'number'
    },
    {
      selector: '.address',
      name: 'address',
      type: 'text',
      min: 1,
      max: 255
    },
    {
      selector: '.email',
      name: 'email',
      type: 'email'
    },
  ]);
});


// Khi bấm vào button `Create` hoặc `Save`
function submitClickHandle() {

  // khi click nút `Create` hoặc `Save`
  if (!validation.noError()) return; // --> kiểm tra nếu có lỗi thì return, không cho phép `Create` hoặc `Save`

  if (isEditMode()) {

    editStudentHandle();

  } else {
    var student = getStudentInfoFromInputs();
    // add student
    addStudent(student)

    // render view
    renderStudents()

    studentFormReset()
  }
}

function enableEditMode() {
  editMode = true;
}

function disableEditMode() {
  editMode = false;
}

function isEditMode() {
  return editMode == true;
}

// render students
function renderStudents() {
  var html = ''
  for (var i = 0; i< students.length; i++) {
    var student = students[i];
    html += '<li class="student">'
    html += '<p><span>Name:</span>' + student.name + '</p>'
    html += '<p><span>Age:</span> ' + student.age + '</p>'
    html += '<p><span>Phone:</span> ' + student.phone + '</p>'
    html += '<p><span>Addess:</span> ' + student.address + '</p>'
    html += '<i class="student-delete" onclick="onDeleteStudent(' + i + ')">X</i>'
    html += '<i class="student-edit" onclick="onEditStudent(' + i + ')">Edit</i>'
    html += '</li>'
  }

  setHTML('#students-list', html)
}

// on click to edit student button
function onEditStudent(index) {

  studentIdTmp = index;

  var student = getStudent(index)

  // fill value to inputs
  setInputValue('.student-form .name', student.name);
  setInputValue('.student-form .age', student.age);
  setInputValue('.student-form .phone', student.phone);
  setInputValue('.student-form .address', student.address);

  // Khi edit, kiểm tra tất cả các trường vừa đc fill vào form
  // Nếu có lỗi --> báo lỗi luôn
  // Nếu không lỗi --> clean lỗi cũ đi (nếu có)
  validation.checkAllError();

  // enable editMode
  enableEditMode();

  setHTML('.createStudent', 'Save');
}

// get student
function getStudent(index) {
  return students[index];
}

// inner HTML to insite a element
function setHTML(selector, html) {
  var element = document.querySelector(selector);
  element.innerHTML = html;
}

// delete student
function studentDelete(index) {
  students.splice(index, 1)
}

// get value from input
function getInputValue(selector) {
  var inputElement = document.querySelector(selector)
  return inputElement.value
}

// set value to input by selector
function setInputValue(selector, value) {
  var element = document.querySelector(selector);
  element.value = value;
}

// on click to delete student button
function onDeleteStudent(index) {
  if (confirm('Are you sure???')) {
    studentDelete(index)
    renderStudents()
  }
}

function editStudentHandle() {
  var student = getStudentInfoFromInputs();

  // edit student
  editStudent(studentIdTmp, student)

  // render student
  renderStudents()

  // disable editMode
  disableEditMode()

  setHTML('.createStudent', 'Create')

  studentFormReset()
}

// clear value of inputs student form
function studentFormReset() {
  setInputValue('.student-form .name', '');
  setInputValue('.student-form .age', '');
  setInputValue('.student-form .phone', '');
  setInputValue('.student-form .address', '');
}

// edit student by index
function editStudent(index, student) {
  students[index] = student;
}

function getStudentInfoFromInputs() {
  var name = getInputValue('.student-form .name')
  var age = getInputValue('.student-form .age')
  var phone = getInputValue('.student-form .phone')
  var address = getInputValue('.student-form .address')
  return {
    name: name,
    age: age,
    phone: phone,
    address: address
  }
}

function getElement(selector) {
  var element = document.querySelector(selector);
  return element;
}

// add student
function addStudent(student) {
  students.push(student)
}
