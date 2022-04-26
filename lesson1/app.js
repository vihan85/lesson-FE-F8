var studensObject = new Object();

console.log('Start program.');

function getStudent(studens) {
    var name = studens.name;
    var age = studens.age;
    var message = "student name: " + name + ". Student age: " + age;
    return message;
}

studensObject.name = "Vi";
studensObject.age = 26;

var student = getStudent(studensObject);

// document.getElementById("result").innerHTML = student;

var text = '';
for(var i = 0; i < 10; i++) {
    var number = i + 1;
    text += 'number: ' + number;
}
document.getElementById("result").innerHTML = text;


