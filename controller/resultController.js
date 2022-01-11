const db = require("../models")

exports.addmarks = (req, res) => {
    db.student.findOne({
        where: {
            enrollNo: req.body.enrollNo
        }
    }).then((data) => {
        db.result.create({
            enrollNo: req.body.enrollNo,
            class: req.body.class,
            semester: req.body.semester,
            maths: req.body.maths,
            science: req.body.science,
            english: req.body.english
        })
    }).catch((error) => {
        res.send("Error : " + error)
    });
}