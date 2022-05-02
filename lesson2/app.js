// tạo biến để lưu trữ 3 nút cần js
const buyBtns = document.querySelectorAll('.js-buy-ticket')

function showBuyStickets(){
  

}

for (const buyBtn of buyBtns) {
    buyBtn.addEventListener('click', showBuyStickets)
}