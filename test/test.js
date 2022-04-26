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

console.log(student);