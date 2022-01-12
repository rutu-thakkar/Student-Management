const express = require('express');
const route = express.Router();
const student = require('../controller/studentController')
const cookieParser = require('cookie-parser')

route.use(cookieParser())

route.get('/', student.home)
route.get('/register', (req, res) => {
    res.render('register')
})
route.post('/register', student.studentRegister);
route.get('/login', (req, res) => {
    res.render('login')
})

route.post('/loggedin', student.studentLogin);

route.get('/getStudentByEnroll/:enrollNo', student.getStudentByEnroll);

route.get('/viewAllStudents', student.viewAllStudents);
route.put('/updateStudent/:enrollNo', student.updateStudent);
route.delete('/deleteStudent/:enrollNo', student.deleteStudent);
route.get('/searchByName', student.searchByName)
route.get('/searchByCity', student.searchByCity)
route.get('/resultLinks', student.getresultLinks)
route.get('/classResult', student.classResult)
route.get('/semesterResult', student.semesterResult)
route.get('/index', student.logout)

module.exports = route;