module.exports = (sequelize, DataTypes) => {
    const student = sequelize.define('student', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        enrollNo: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        city: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        image: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });
    return student;
}