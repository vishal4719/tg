module.exports = (sequelize, Sequelize) => {
    const upload_docs = sequelize.define('DocumentsDuringAdmission', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        Dashboard_id: {
            type: Sequelize.INTEGER,
            references: {
                model: 'dashboards',
                key: 'dashboard_primary_key'
            },
            allowNull: true,
        },
        result_12th: {
            type: Sequelize.STRING,
           
        },
        aadharCard: {
            type: Sequelize.STRING,

        },
        panCard: {
            type: Sequelize.STRING,

        },
        mhtcetResult: {
            type: Sequelize.STRING,

        },
        admissionCard: {
            type: Sequelize.STRING,

        },
        capCard: {
            type: Sequelize.STRING,

        },
        domicile: {
            type: Sequelize.STRING,
            allowNull: true
        },
        birthCertificate: {
            type: Sequelize.STRING,
            allowNull: true
        },
        leavingCertificate: {
            type: Sequelize.STRING,
            allowNull: true
        },
        filePath: {
            type: Sequelize.STRING,

        },
        fileType: {
            type: Sequelize.STRING,

        }
    });

    return upload_docs;
};