const express = require('express');
const route = express.Router();
const student = require('../controller/studentController')
const cookieParser = require('cookie-parser')
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        cb(null, new Date().getTime() + file.originalname)
    }
});

var upload = multer({ storage: storage })
route.use(cookieParser())

route.get('/', student.home)
route.get('/register', (req, res) => {
    res.render('register')
})
route.post('/register', upload.single('image'), student.studentRegister);
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