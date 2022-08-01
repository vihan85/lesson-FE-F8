'use strict';
// đối tượng validator
function validator(options) {
    var formElement = document.querySelector(options.form);
    function validate(inputElement, rule) {
        var errorElement = inputElement.parentElement.querySelector(options.errorSelector);
        // từ đây có thể lấy đc value của từng input
        // và lấy đc các func tương ứng của từng rule rule.test
        var errorMesg = rule.test(inputElement.value, inputElement);

        if(errorMesg) { 
            errorElement.textContent = errorMesg;
            inputElement.parentElement.classList.add('invalid');
        }else{
            errorElement.textContent = '';
            inputElement.parentElement.classList.remove('invalid');
        }
    }

    if(formElement) {
        formElement.onsubmit = function(e) {
            e.preventDefault()
            options.rules.forEach(function(rule) {
                let inputElement = formElement.querySelector(rule.selector);
                
            })
        }

        options.rules.forEach(function(rule) {
            // ddang validate cho form nào thì đứng tại form đó lấy các selector ra để tránh nhầm với các form khác có cùng tên class
            var inputElement = formElement.querySelector(rule.selector);
            // var errorElement = inputElement.parentElement.querySelector(options.errorSelector);
            // xử lý khi blur ra ngoài
            if(inputElement) {
                inputElement.onblur = function(e) {
                    validate(inputElement, rule)
                }
            };

            var errorElement = inputElement.parentElement.querySelector(options.errorSelector);
            // xử lý khi người dùng bắt đầu nhập
            inputElement.oninput = function() {
                console.log('test');
                errorElement.textContent = '';
                inputElement.parentElement.classList.remove('invalid');
            }

        });
    }

};



// định nghĩa các rules
// nguyên tắc của các rule do mình tự đặt
// 1. khi có lỗi thì trả ra msg lỗi
// 2. hợp lễ thì trả về undifine
validator.isRequired = function (selector) {
    return {
        selector: selector,
        // funciton này thực hiện các chức năng riêng cho tuèng rule
       
        test: function(value) {
            return value.trim() ? undefined : "Vui lòng nhập trường này";
        }
    }
};
validator.isEmail = function (selector) {
    return {
        selector: selector,
        // funciton này thực hiện các chức năng riêng cho tuèng rule
        test: function(value) {
            var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            return regex.test(value) ? undefined : 'Vui lòng nhập Email'
        }
    }
};
validator.minLenght = function(selector, min) {
    return {
        selector: selector,
        test: function(value) {
            return value.lenght >= min ? undefined : 'Vui lòng nhập ít nhất 6 ký tự'
        }
    }
};
validator.matchPass = function(selector, getPass) {
    return {
        selector: selector,
        test: function(value) {
            return value === getPass() ? undefined : 'Vui lòng nhập lại pass'
        }
    }
};
// validator.submit = function(selector) {
//     var submit = document.querySelector(selector);
//             submit.onclick = function(e) {
//                 e.preventDefault()
//             }
//     return {
//         selector: selector,
//         test: function(value, inputElement) {
//             return console.log(inputElement)
//         }
//     }
// }

validator({
    form: '#form-1',
    errorSelector: '.form-message',
    rules: [
        validator.isRequired('#fullname'),
        validator.isEmail('#email'),
        validator.minLenght('#password', 6),
        validator.matchPass('#password_confirmation', function getPass() {
            return document.querySelector('#password').value;
        }),



    ]
});
// sunbmit
//1. khi bấm vào nut submit sẽ tra về cái value người dùng đã nhập