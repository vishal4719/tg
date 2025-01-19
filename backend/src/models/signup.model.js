module.exports = (sequelize, Sequelize) => {
    const Signup = sequelize.define("signup", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        UID: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
        },
        student_name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        surname: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        gender: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        stud_phone_no: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        stud_email: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
        },
        branch: {  // Changed to lowercase
            type: Sequelize.STRING,
            allowNull: false,
        },
        division: { // Changed to lowercase
            type: Sequelize.STRING,
            allowNull: false,
        },
        roll_no: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        father_name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        mother_name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        parent_email: {
            type: Sequelize.STRING,
            allowNull: true,  // Optional field
        },
        parent_phone_no: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        year_of_admission: { 
            type: Sequelize.INTEGER, // For year-only values like 2024
            allowNull: false,
        },
        student_address: {
            type: Sequelize.TEXT, // Allows longer address inputs
            allowNull: false,
        },
        pincode: {
            type: Sequelize.STRING,
            allowNull: false,
        },
    });

    return Signup;
};
