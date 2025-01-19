module.exports = (sequelize, Sequelize) => {
  const FormData = sequelize.define('form_data', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    rollNo: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  });

  // If there are other associations, they can be added here.
  
  return FormData;
};
