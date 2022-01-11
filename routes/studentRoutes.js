const express = require('express');
const route = express.Router();
const student = require('../controller/studentController')

route.get('/register', (req,res) => {
    res.render('register')    
})
route.post('/register', student.studentRegister);
route.get('/login', (req,res) => {
    res.render('login')    
})

route.post('/login', student.studentLogin);

route.get('/getStudentByEnroll/:enrollNo', student.getStudentByEnroll);

route.get('/viewAllStudents', student.viewAllStudents);
route.put('/updateStudent/:enrollNo', student.updateStudent);
route.delete('/deleteStudent/:enrollNo', student.deleteStudent);
route.get('/searchByName', student.searchByName)
route.get('/searchByCity', student.searchByCity)


module.exports = route;