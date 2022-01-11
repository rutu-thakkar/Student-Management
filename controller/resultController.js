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