const express = require('express');
const route = express.Router();
const result = require('../controller/resultController');

route.post('/addmarks', result.addmarks);
route.get('/viewAllResults', result.viewAllResults);
route.get('/viewResultByEnroll/:enrollNo', result.viewResultByEnroll);
route.get('/viewResultByClass', result.viewResultByEnrollAndClass);
route.get('/viewResultSemesterWise', result.viewResultSemesterWise);
route.delete('/deleleResult', result.deleteResult)
route.put('/updateResult', result.updateResult)

module.exports = route