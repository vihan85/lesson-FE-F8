// tạo biến để lưu trữ 3 nút cần js
const buyBtns = document.querySelectorAll('.js-buy-ticket')
const modal = document.querySelector('.js-modal')
const modalClose = document.querySelector('.js-modal-close') 
const modalcontainer = document.querySelector('.js-modal-container')

function showBuyStickets(){
    modal.classList.add('open')
}
function hideBuyStickets(){
    modal.classList.remove('open')
}

for (const buyBtn of buyBtns) {
    buyBtn.addEventListener('click',showBuyStickets)
}
modalClose.addEventListener('click',hideBuyStickets)
modal.addEventListener('click',hideBuyStickets)
modalcontainer.addEventListener('click', function (event){
    event.stopPropagation()
})

// đóng mở menu

var header = document.getElementById('header');
var menuBtn = document.getElementById('btn-mobile-menu');
var abc = header.clientHeight;
menuBtn.onclick = function() {
    var isClose = header.clientHeight === abc
    if (isClose){
        header.style.height ='auto';
    }
    else {
        header.style.height = null;
    }
}

