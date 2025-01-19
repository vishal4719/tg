//Created a new table for login and db things 
module.exports = (sequelize, Sequelize) => {
    const Login = sequelize.define("login", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            },
        },
        otp: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        otp_expiry: {
            type: Sequelize.DATE,
            allowNull: false,
        },
        createdAt: {
            type: Sequelize.DATE,
            allowNull: false
        },
        updatedAt: {
            type: Sequelize.DATE,
            allowNull: false
        }
    });

    return Login;
};