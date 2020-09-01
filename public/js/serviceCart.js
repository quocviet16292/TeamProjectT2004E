// Progress Bar and Step Form

var currentTab = 0; // Current tab is set to be the first tab (0)
showTab(currentTab); // Display the current tab


function showTab(n) {
    var x = document.getElementsByClassName("vbooking__step");
    x[n].style.display = "block";
    if (n == 0) {
        document.getElementById("prevBtn").style.display = "none";
    } else {
        document.getElementById("prevBtn").style.display = "inline";
    }
    if (n == (x.length - 1)) {
        document.getElementById("nextBtn").innerHTML = "Submit <i class=\"fas fa-paper-plane\"></i>";
    } else {
        document.getElementById("nextBtn").innerHTML = "Next <i class=\"fas fa-chevron-right\">";
    }
    fixStepIndicator(n)
}


function nextPrev(n) {
    var x = document.getElementsByClassName("vbooking__step");
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
    // if (valid) {
    //   document.getElementsByClassName("step")[currentTab].className += " finish";
    // }
    // return valid; // return the valid status
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
function getNumber (e){
    let pNumbers = document.getElementById('qty__persons').value;
    e.querySelector('#display__numbers').innerHTML = pNumbers;
    e.querySelector('#display__total').innerHTML = (pNumbers*500000).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

};

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



//AddToCart
// Number Spinner
var selectList = [];
$(function(){
    $('input[type="number"]').niceNumber({
        autoSize:false,
        autoSizeBuffer: 1,
        buttonDecrement:'-',
        buttonIncrement:"+",
        buttonPosition:'around'
    });
    $('#btnchangeplus').click(function() {
        let textSelect = $('#service__select option:selected').text()
        if(selectList.length == 0){
            addToCart();
        }else{
            if(selectList.includes(textSelect)){
                getNumber();
            }else {
                addToCart();
            }
        }

    })
});


function addToCart(){
    let title = $('#service__select option:selected').text()
    let price = 500000
    addService(title, price)
}

function  addService(title, price){
    selectList.push(title, price);
    var cartRow = document.createElement('div')
    cartRow.classList.add('cart-row')
    cartRow.classList.add('row')
    var cartItem = document.getElementsByClassName('cart-items')[0]
    var cartRowContent = `
        <div class="col-11">
            <h3 class="service__title">${title}</h3>
            <p><span id="display__numbers"></span><span> x ${price}</span></p>
            <p><b><span id="display__total"></span></b></p>
        </div>
        <div class="col-1">
            <a class="btn__remove" onclick="removeItem()"><i class="fas fa-times fa-lg" style="color: var(--main-color)"></i></i> </a>
        </div>`
    cartRow.innerHTML = cartRowContent
    cartItem.append(cartRow)
}




