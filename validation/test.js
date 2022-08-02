'use strict';
// đối tượng validator
var selectorRules = {};

function validator(options) {

    //lưu các rule
    var formElement = document.querySelector(options.form);
    function validate(inputElement, rule) {
        var errorElement = inputElement.parentElement.querySelector(options.errorSelector);
        var errorMesg;
        // từ đây có thể lấy đc value của từng input
        // và lấy đc các func tương ứng của từng rule rule.test

        // lấy ra các rules của selector
        var rules = selectorRules[rule.selector]
        // lập qua từng rule và kiểm tra
        // nếu có lỗi thì dừng kiểm tra
        for(var i = 0 ; i < rules.length; ++i ) {
            errorMesg = rules[i](inputElement.value, inputElement);
            if(errorMesg) break;
        }

        if(errorMesg) { 
            errorElement.textContent = errorMesg;
            inputElement.parentElement.classList.add('invalid');
        }else{
            errorElement.textContent = '';
            inputElement.parentElement.classList.remove('invalid');
        }

        return !errorMesg

    }

    if(formElement) {
        
            // lặp qua các rule và xử lý (lắng nghe sự kiện)
            options.rules.forEach(function(rule) {
            //lưu rule cho mỗi input
            if(Array.isArray(selectorRules[rule.selector])) {
                selectorRules[rule.selector].push(rule.test)
            } else {
                selectorRules[rule.selector] = [rule.test];
            };


            // ddang validate cho form nào thì đứng tại form đó lấy các selector ra để tránh nhầm với các form khác có cùng tên class
            var inputElement = formElement.querySelector(rule.selector);
            
            // var errorElement = inputElement.parentElement.querySelector(options.errorSelector);
            // xử lý khi blur ra ngoài
            if(inputElement) {
                inputElement.onblur = function(e) {
                    validate(inputElement, rule)
                }
            };

            // xử lý khi người dùng bắt đầu nhập
            inputElement.oninput = function() {
                validate(inputElement, rule)
                // errorElement.textContent = '';
                // inputElement.parentElement.classList.remove('invalid');
            }

        });

        // khi submit form
        formElement.onsubmit = function(e) {
            e.preventDefault()
            var isFormValid = true;
            // lặp qua từng rule và validate
            options.rules.forEach(function(rule) {
                let inputElement = formElement.querySelector(rule.selector);
                var isvalid = validate(inputElement, rule);
                if(!isvalid) {
                    isFormValid = false;
                }
            });

            
        
            if(isFormValid) {
                if(typeof options.onSubmit === 'function') {
                    var enableInput = formElement.querySelectorAll('[name]:not([disable])')
                    var formValues = Array.from(enableInput).reduce(function(values, input) {
                    values[input.name] = input.value
                    return values
                    }, {})
                    console.log(formValues)
                }
            } 
            
            // submit với hành vi mặc định
            else {
                formElement.onSubmit()
                
            }

            
        }

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
            return value.length >= min ? undefined : 'Vui lòng nhập ít nhất 6 ký tự'
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
        validator.isRequired('#password', 6),
        validator.isRequired('#email'),
        validator.isRequired('#password_confirmation'),
        validator.minLenght('#password', 6),
        validator.isEmail('#email'),
        validator.matchPass('#password_confirmation', function getPass() {
            return document.querySelector('#password').value;
        }),
    ],
    onSubmit : function(data) {
        console.log(data)
    }
});
// sunbmit
//1. khi bấm vào nut submit sẽ tra về cái value người dùng đã nhập