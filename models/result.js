const student = require("../models/student");

module.exports = (sequelize, DataTypes) => {
    const result = sequelize.define('result', {
        enrollNo: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        class: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        semester: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        maths: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        science: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        english: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    });
    // result.belongsTo(student)
    return result;
}