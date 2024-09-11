module.exports = (sequelize, DataTypes) => {
  const Planner = sequelize.define('Planner', {
    name: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT },
    ownerName: { type: DataTypes.STRING, allowNull: false },
    status: { type: DataTypes.STRING, allowNull: false },
    plannerType: { type: DataTypes.ENUM('PlannerType1', 'PlannerType2'), allowNull: false },
    externalSystemId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'ExternalSystems',
        key: 'id'
      },
      allowNull: false
    },
    triggerSources: { type: DataTypes.BOOLEAN, defaultValue: false },
    triggerRuns: { type: DataTypes.BOOLEAN, defaultValue: false },
    triggerReports: { type: DataTypes.BOOLEAN, defaultValue: false }
  }, {
    tableName: 'Planners' // Explicitly define table name
  });

  Planner.associate = function(models) {
    Planner.belongsTo(models.ExternalSystem, { foreignKey: 'externalSystemId', as: 'externalSystemConfig' });

    // Planner.belongsToMany(models.Fund, {
    //   through: 'PlannerFunds',
    //   foreignKey: 'plannerId',
    //   otherKey: 'fundId',
    //   as: 'funds'
    // });

    // Planner.belongsToMany(models.Source, {
    //   through: 'PlannerSources',
    //   foreignKey: 'plannerId',
    //   otherKey: 'sourceId',
    //   as: 'sources'
    // });

    // Planner.belongsToMany(models.Run, {
    //   through: 'PlannerRuns',
    //   foreignKey: 'plannerId',
    //   otherKey: 'runId',
    //   as: 'runs'
    // });

    // Planner.belongsToMany(models.Report, {
    //   through: 'PlannerReports',
    //   foreignKey: 'plannerId',
    //   otherKey: 'reportId',
    //   as: 'reports'
    // });
  };

  return Planner;
};