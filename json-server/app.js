var coursesApi = 'http://localhost:3000/courses'

function start() {
    getCouresApi(renderCode)

};
start()

function getCouresApi(callback) {
    fetch(coursesApi)
        .then(function (respones) {
            return respones.json();
        })
        .then(callback)
};

function renderCode(courses) {
    var coursesblock = document.querySelector('#test')
    var html = courses.map(function (course) {
        return `
<li>${course.name}
`
    });
    coursesblock.innerHTML = html.join('')
}