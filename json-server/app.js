var url = 'http://localhost:3000/courses';
// get produc 
// render

function start() {
    getProducts(renderCode);
    handleCreatForm()
};
start();

function getProducts(callback) {
    fetch(url)
        .then(function (respones) {
            return respones.json()
        })
        .then(callback);
};

// send request to origin

function creatForm(data, callback) {
     var post = {
        method: 'POST',
        headers: {
            'content-Type': 'application/json'
        },
        body: JSON.stringify(data)
     }
     fetch(url, post)
        .then(function(respones) {
            return respones.json();
        })
        .then(callback)
}

// Delete

 function handleDelete(id) {
    var deleteOption = {
        method: 'delete',
        headers: {
            'content-Type': 'application/json'
        }
    };
    fetch(url + '/' + id, deleteOption)
    .then(function(respones) {
        return respones.json()
    })
    .then(function() {
        var getUL = document.querySelector('.handleDelete')
        if(getUL) {
            getUL.classList.remove('.handleDelete')
        };
    });
 };

//  Edit
function handleEditContent(data, id) {
    var put = {
        method: 'put',
        headers: {
            'content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };

    fetch(url + "/" + id, put)
    .then(function(respones) {
        return respones.json()
    })
    .then(function(data) {
        // getProducts(renderCode)
    })
}

function renderCode(producs) {
    var producsBlock = document.querySelector('#test')
    var html = producs.map(function (produc){
        return `
        <li class="deleteElement">
        <h3>${produc.name}</h3>
        <p>${produc.description}</p>
        <p>${produc.price}</p>
        <button onclick="handleDelete(${produc.id})">Xóa</button>
        <input  type="text" name="editContentName-${produc.id}" placeholder="Nhập nội dung" >
        <button onclick="getContent(${produc.id})">send</button>
        </li>
        `
    })
    
    producsBlock.innerHTML = html.join('');
};

// get Info from client

function handleCreatForm() {
    var btn = document.querySelector('.btn');
    btn.onclick = function() {
        var name = document.querySelector('input[name="product"').value;
        var description = document.querySelector('input[name="description"]').value;
        var price = document.querySelector('input[name="price"]').value;
        var formdata = {
            name: name,
            description: description,
            price: price
        }
        creatForm(formdata,function() {
            getProducts(renderCode)
        });
    };
    
};
function getContent(id) {
    var getContentNameEdit = document.querySelector(`input[name="editContentName-${id}"]`).value;
    var edit = {
        name: getContentNameEdit
    }
     handleEditContent(edit,id)
}

// Ý tưởng : get, edit, delete data theo ID.
// b1: mapping data và function bằng id
// b2: get data theo id