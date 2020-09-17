// Progress Bar and Step Form

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


//Get Number
function getNumber (price){
    let pNumbers = parseInt($('#qty__persons').val());
    let cartRowTitle = document.getElementsByClassName('service__title');
    let textSelect = $('#service__select option:selected').text();
    for(let i =0; i <cartRowTitle.length; i++){
        if(cartRowTitle[i].textContent == textSelect){
            document.getElementsByClassName('service__title')[i].parentElement.children[1].children[0].innerText = pNumbers;
            // document.getElementsByClassName('service__title')[i].parentElement.children[2].children[0].innerText = (pNumbers*price).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            document.getElementsByClassName('service__title')[i].parentElement.children[2].children[0].innerHTML = pNumbers*500000;
        }
    }

}

//Reset Number
function resetNumber(){
    document.getElementById('qty__persons').value = 1;
}
//AddToCart
// Number Spinner
var selectList = [];


let clientName = document.getElementById('Cname').value;


function addToCart(price){
    let title = $('#service__select option:selected').text();
    addService(title, price);
}

function  addService(title, price){
    selectList.push(title, price);
    var cartRow = document.createElement('div')
    cartRow.classList.add('cart-row')
    cartRow.classList.add('row')
    var cartItem = document.getElementsByClassName('cart-items')[0]
    var cartRowContent = `
        <div class="col-11">
            <h3 class="service__title" name="serviceTitle">${title}</h3>
            <p><span class="display__number" name="quantity">1</span><span> x ${price}</span></p>
            <p><b class="display__total"  name="thanhtien"></b></p>
        </div>
        <div class="col-1">
            <a class="btn__remove" onclick="removeItem()"><i class="fas fa-times fa-lg" style="color: var(--main-color)"></i></i> </a>
        </div>`
    cartRow.innerHTML = cartRowContent

    cartItem.append(cartRow);





    var cartRow1 = document.createElement('div')
    cartRow1.classList.add('cart-row')
    cartRow1.classList.add('row')
    var cartItem1 = document.getElementsByClassName('cart-items-2')[0]
    var cartRowContent1 = `
        <div class="col-12">
            <h3 class="service__title">${title}</h3>
            <p style="float: left"><span class="display__number1" name="quantity1">1</span><span> x ${price}</span></p>
            <p style="float: right"><b class="display__total1" name="thanhtien1"></b></p> 
        </div>`
    cartRow1.innerHTML = cartRowContent1;
    cartItem1.append(cartRow1);
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
// let total = 0;
// for(let i = 0; i < document.getElementsByClassName('display__total').length; i++){
//     total += (parseFloat(document.getElementsByClassName('display__total')[i].innerText)*500000);
//     //Loi so thap phan
// }
// console.log(total);
// // }
//
// sumCount();


function getSum(){
    let x = document.getElementsByClassName('display__total');
    let sum = 0;
    for(let i=0; i < x.length; i++){
        sum = sum + parseInt(x[i].innerHTML);
        console.log(x.length, x[i].innerHTML, sum)
    }

    document.getElementById('getSubtotal').innerHTML = sum;
    document.getElementById('getSubtotal1').innerHTML = sum;
    document.getElementById('getGrandtotal').innerHTML = sum;
    document.getElementById('getGrandtotal1').innerHTML = sum;
}

$(function() {
    $('input[type="number"]').niceNumber({
        autoSize: false,
        autoSizeBuffer: 1,
        buttonDecrement: '-',
        buttonIncrement: "+",
        buttonPosition: 'around'
    });
    $('#btnchangeplus').click(function () {
        let textSelect = $('#service__select option:selected').text()
        if (selectList.length == 0) {
            addToCart();
            getNumber();
            getSum();
        } else {
            if (selectList.includes(textSelect)) {
                getNumber();
                getSum();
            } else {
                addToCart();
                getNumber();
                getSum();
            }
        }
    })
})




// Remove Service Button
//REMOVE nhưng chưa xóa khỏi mảng SelectList được
function removeItem(){
    let removeItemBtn = document.getElementsByClassName("btn__remove");
    for(let i=0; i < removeItemBtn.length; i++){

        let button = removeItemBtn[i];

        button.addEventListener('click',(event)=>{
            let buttonClicked = event.target;
            let title = buttonClicked.parentElement.parentElement.children[0].children[0].innerText;
            buttonClicked.parentElement.parentElement.parentElement.remove();
            for(let j=0; j < selectList.length; j++){
                if(selectList[j] === title){
                    selectList.splice(j,2);
                }
            }
        })
    }
}