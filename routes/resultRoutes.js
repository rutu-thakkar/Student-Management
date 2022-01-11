const express = require('express');
const route = express.Router();
const result = require('../controller/resultController');

route.post('/addmarks', result.addmarks);
route.get('/viewAllResults', result.viewAllResults);
route.get('/viewResultByEnroll/:enrollNo', result.viewResultByEnroll)

module.exports = route