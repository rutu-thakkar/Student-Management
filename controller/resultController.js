const res = require("express/lib/response");
const db = require("../models")

exports.addmarks = (req, res) => {
    db.student.findOne({
        where: {
            enrollNo: req.body.enrollNo
        }
    }).then((data) => {
        db.result.findOne({
            where: {
                enrollNo: req.body.enrollNo,
                class: req.body.class,
                semester: req.body.semester
            }
        }).then((data) => {
            if (data) {
                res.send("Can't Enter details as It is already entered")
            } else {
                db.result.create({
                    enrollNo: req.body.enrollNo,
                    class: req.body.class,
                    semester: req.body.semester,
                    maths: req.body.maths,
                    science: req.body.science,
                    english: req.body.english
                }).then((data) => {
                    if (!data) {
                        res.send("No data Found");
                    } else {
                        res.send(data)
                    }
                }).catch((error) => {
                    res.send("error : " + error)
                })
            }
        })
    }).catch((error) => {
        res.send("Error : " + error)
    });
}

exports.viewAllResults = (req, res) => {
    db.result.findAll().then((data) => {
        res.send(data);
    }).catch((error) => {
        res.send("error : " + error)
    })
}

exports.viewResultByEnroll = (req, res) => {
    db.result.findAll({
        where: {
            enrollNo: req.params.enrollNo
        }
    }).then((data) => {
        if (Object.keys(data).length === 0) {
            res.send("No data Found");
        } else {
            res.send(data)
        }
    }).catch((error) => {
        res.send("error : " + error)
    })
}

//view Result of a student classwise
exports.viewResultByEnrollAndClass = (req, res) => {
    console.log(req.query.classno)
    console.log(req.query.enrollNo)
    db.result.findAll({
        where: {
            enrollNo: req.query.enrollNo,
            class: req.query.classno
        }
    }).then((data) => {
        if (Object.keys(data).length === 0) {
            res.send("no data found")
        } else {
            res.send(data)
        }
    }).catch((error) => {
        res.send("error : " + error)
    })
}

// view result by enrollNo, class and semester
exports.viewResultSemesterWise = (req, res) => {
    db.result.findOne({
        where: {
            enrollNo: req.query.enrollNo,
            class: req.query.classno,
            semester: req.query.semester
        }
    }).then((data) => {
        if (!data) {
            res.send('No data found')
        } else {
            res.send(data)
        }
    }).catch((error) => {
        res.send("Error : " + error)
    })
}

// delete result 
exports.deleteResult = (req, res) => {
    db.result.findOne({
        where: {
            enrollNo: req.body.enrollNo,
            class: req.body.class,
            semester: req.body.semester
        }
    }).then((data) => {
        if (!data) {
            res.send("No data Found.");
        } else {
            db.result.destroy({
                where: {
                    enrollNo: data.enrollNo,
                    class: data.class,
                    semester: data.semester
                }
            }).then((data) => {
                if (data) {
                    res.send(data + " Data Deleted");
                } else {
                    res.send("Something went Wrong!");
                }
            }).catch((error) => {
                res.send("error : " + error);
            })
        }
    }).catch((error) => {
        res.send("error : " + error);
    })
}

// Update Result
exports.updateResult = (req, res) => {
    db.result.findOne({
        where: {
            enrollNo: req.body.enrollNo,
            class: req.body.class,
            semester: req.body.semester
        }
    }).then((data) => {
        if (!data) {
            res.send("No data Found.");
        } else {
            db.result.update({
                maths: req.body.maths,
                science: req.body.science,
                english: req.body.english
            }, {
                where: {
                    enrollNo: data.enrollNo,
                    class: data.class,
                    semester: data.semester

                }
            }).then((updatedResult) => {
                if (updatedResult) {
                    res.send(updatedResult + " data updated!");
                } else {
                    res.send("Something went wrong!")
                }
            }).catch()
        }
    }).catch((error) => {
        res.send("error : " + error);
    })
}