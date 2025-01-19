module.exports = (sequelize, DataTypes) => {
  const ActivityPoints = sequelize.define('ActivityPoints', {
    student_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    activity_type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    activity_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    hours_requested: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    hours_approved: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    certificate_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    certificate_by: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    certificate_file: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('pending', 'approved', 'rejected'),
      defaultValue: 'pending',
    },
    admin_comments: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  });

  return ActivityPoints;
};
