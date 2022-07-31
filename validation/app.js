// tạo function validator
function validator(options) {
   
};
validator({
    ObjectForm: document.querySelector('#form-1'),
    rules: [
        
        checkREgex('#password', '.form-message', 'Password chứa ít nhất 5 ký tự và chứa một ký tự đặc biệt',/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,120}$/),
        checkEmpty('#fullname', '.form-message', 'vui lòng nhập trường này'),
        checkEmpty('#password_confirmation', '.form-message', 'vui lòng nhập trường này'),
        // checkPass('#password', '.form-message', 'Password chứa ít nhất 5 ký tự và chứa một ký tự đặc biệt',/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/),
        checkREgex('#email', '.form-message', 'vui lòng nhập lại email',/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/),
        change('#fullname','.form-message'),
        change('#password', '.form-message'),
        change('#email', '.form-message'),
        change('#password_confirmation', '.form-message'),



    ]
});
function checkEmpty(inputElement, errorElement, message ) {
    let input = document.querySelector(inputElement);
    input.onblur = function() {
    let input = document.querySelector(inputElement);
        let errorEl = input.parentElement.querySelector(errorElement)
        let value = input.value.trim()
        if (value == '') {
           input.parentElement.classList.add('invalid');
            errorEl.textContent = message;
        }else {
            errorEl.textContent = '';
           input.parentElement.classList.remove('invalid');
        }
    }
};
//check regex mail add pass
//1. có ít nhất 5 ký tự và chứa ít nhất 1 ký tự đặc biệt
//2 dài nhất 250 ký tự
function checkREgex(inputElement, errorElement, message, regex ) {
    let input = document.querySelector(inputElement);
    input.onblur = function(e) {
        let input = document.querySelector(inputElement);
        let errorEl = input.parentElement.querySelector(errorElement)
        let value = input.value.trim();
        let condition = regex.test(value)
        if (!condition && value !== '') {
           input.parentElement.classList.add('invalid');
            errorEl.textContent = message;
        }else if(value == ''){
            input.parentElement.classList.add('invalid');
            errorEl.textContent = 'vui lòng nhập trường này'
        }else {
            errorEl.textContent = '';
            input.parentElement.classList.remove('invalid');
            inputElement == '#password' ? checkPass(value) : undefined;
        }
    }

};
function change(inputElement, errorElement) {
    var input = document.querySelector(inputElement)
    input.onfocus =function() {
        let errorEl = input.parentElement.querySelector(errorElement)
        if(input.parentElement.classList.contains('invalid')) {
            input.parentElement.classList.remove('invalid');
            errorEl.textContent = '';
        }
        
    }
}
function checkPass(value) {
    var inputElement = document.querySelector('#password_confirmation');
    var errorElement =inputElement.parentElement.querySelector('.form-message')
    inputElement.onblur = function() {
    var valuePasswordConfirmation = inputElement.value
     if(valuePasswordConfirmation == value) {
        
     }else{
        errorElement.textContent = 'Mật khẩu không trùng khớp'
        inputElement.parentElement.classList.add('invalid')
     }
    }
};


//password_confirmation
// 1 lấy value của password với điều kiện value đúng quy định so sánh với value của password_confirmation
// nếu trùng khớp trả về undifined nếu không trùng khớp trả về msg lỗi

// khi rỗng hiển thị msg rỗng khi có dữ liệu sau hiển thị msg lỗi sai
