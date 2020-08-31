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
        let selectList = $('.cart-row')
        if(selectList.length == 0){
            addToCart();
        }else{
            for (let i = 0; i < selectList.length; i++) {
                let titleList = selectList[i].querySelector('div h3').innerText;
                if(textSelect == titleList){
                    getNumber(selectList[i]);
                }else{
                    addToCart();
                    //Mai sua tiep
                }
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




