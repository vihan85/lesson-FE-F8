// var users = [{
//   id: 1,
//   name: 'Kien Dam'
// },

// {
//   id: 2,
//   name: 'Son Dang'
// },

// {
//   id: 3,
//   name: 'Vo Danh'
// }
// ];

// var comments = [{
//   id: 9,
//   user_Id: 1,
//   content: 'anh son chua ra video :('
// },

// {
//   id: 7,
//   user_Id: 2,
//   content: 'vua ra xong em oi ^^'
// },
// {
//   id: 5,
//   user_Id: 2,
//   content: 'cám ơn em ^^'
// }

// ];

// function getUsersByIds(userIds) {
//   return new Promise(function(resolve, reject) {
//     var id = users.filter(function(user) {
//       return userIds.includes(user.id)
//     });
   
//     setTimeout(function(){
//       resolve(id)
//     })
//   }) 
// }

// function getComments() {
//   return new Promise(function(resolve, reject) {
//     setTimeout(function() {
//       resolve(comments);
//     });

//   });
// }

// getComments()
// .then(function(comments) {
//   var userIds = comments.map(function(comment) {
//     return comment.user_Id
//   });
//   return getUsersByIds(userIds)
//   .then(function(users) {
//     return {
//       users: users,
//       comments: comments
//     }
//   });
// })
// .then(function(data) {
//   var ulElement = document.getElementById('comment-block')
//   var html = '';
//   data.users.forEach(function(user) {
//     var comment = data.comments.find(function(comment) {
//       return comment.user_Id === user.id
//     });
//     html += `<li>${user.name}: ${comment.content}`
//   });
//   return ulElement.innerHTML = html
// })


function highlight([a, ...rest], ...values) {
console.log(values)
}
var brand = 'F8';
var course = 'PHP'
highlight`Hoc lap trinh  ${course} tai ${brand}!`