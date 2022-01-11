const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const db = require('../models');
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')

app.use(cookieParser());

exports.getLoginPage = (req, res) => {
    res.render('login');
}

exports.studentRegister = (req, res) => {
    db.student.findOne({
        where: {
            enrollNo: req.body.enrollNo
        }
    }).then((data) => {
        if (data) {
            res.json({
                message: "Enrollment No. already exist"
            })
        } else {
            bcrypt.genSalt(10, (error, salt) => {
                bcrypt.hash(req.body.password, salt, (error, hash) => {
                    const student = {
                        name: req.body.name,
                        enrollNo: req.body.enrollNo,
                        city: req.body.city,
                        password: hash
                    }
                    db.student.create(student).then((data) => {
                        if (Object.keys(data).length === 0) {
                            res.send("oops! something went wrong, Not Inserted")
                        } else {
                            res.send(data);
                        }
                    });
                });
            });
        }
    });
}

exports.studentLogin = (req, res) => {
    db.student.findOne({
        where: {
            enrollNo: req.body.enrollNo
        }
    }).then((data) => {
        if (!data) {
            res.json({
                message: "No Student exist with this enrollment Number"
            })
        } else {
            bcrypt.compare(req.body.password, data.password, (error, result) => {
                if (result) {

                    const tokenfunc = async () => {
                        const token = await jwt.sign({
                            enrollNo: req.body.enrollNo,
                            id: data.id
                        }, "HeyThereIAmSecretKey")
                        return token;
                    }

                    tokenfunc().then((token) => {
                        res.cookie("token", token, { httpOnly: true })
                        res.status(200).render('index', { data: data.dataValues })
                        console.log(data.dataValues)
                    })

                } else {
                    res.json({
                        message: "Invalid Credential"
                    })
                }
            })
        }
    })
}

// Get All Student
exports.viewAllStudents = (req, res) => {
    db.student.findAll().then((data) => {
        if (!data) {
            res.json({
                message: "No data Found"
            });
        } else {
            res.status(200).send(data)
        }
    });
}

//get Student By EnrollNo
exports.getStudentByEnroll = (req, res) => {
    if (!req.body) {
        res.json({
            message: "Enter enrollNo."
        })
    } else {
        db.student.findOne({
            where: {
                enrollNo: req.params.enrollNo
            }
        }).then((data) => {
            if (!data) {
                res.json({
                    message: "No student Found"
                })
            } else {
                res.status(200).render('profile', { data: data.dataValues })
            }
        });
    }
}

//update Student by enroll
exports.updateStudent = (req, res) => {
    db.student.findOne({
        where: {
            enrollNo: req.params.enrollNo
        }
    }).then((data) => {
        if (!data) {
            res.send("NO Student data Found!");
        } else {
            db.student.update({
                name: req.body.name,
                city: req.body.city
            }, {
                where: {
                    enrollNo: req.params.enrollNo
                }
            }).then((updateresult) => {
                if (updateresult === 0) {
                    res.send("oops! Something went wrong!")
                } else {
                    res.send(updateresult + " student data updated");
                }
            });
        }
    });
}

// delete student
exports.deleteStudent = (req, res) => {
    db.student.findOne({
        where: {
            enrollNo: req.params.enrollNo
        }
    }).then((data) => {
        if (!data) {
            res.send("No Student found")
        } else {
            db.student.destroy({
                where: {
                    enrollNo: req.params.enrollNo
                }
            }).then((result) => {
                res.send(result + " Data deleted!")
            })
        }
    })
}

// search student by name
exports.searchByName = (req, res) => {
    db.student.findAll({
        where: {
            name: req.body.name
        }
    }).then((data) => {
        if (Object.keys(data).length === 0) {
            res.send("No Student Data Found")
        } else {
            res.send(data)
        }
    }).catch((error) => {
        res.send("Error : " + error)
    });
}

//search By City
exports.searchByCity = (req, res) => {
    db.student.findAll({
        where: {
            city: req.body.city
        }
    }).then((data) => {
        if (Object.keys(data).length === 0) {
            res.send("No Student Data Found")
        } else {
            res.send(data)
        }
    }).catch((error) => {
        res.send("Error : " + error)
    });
}
