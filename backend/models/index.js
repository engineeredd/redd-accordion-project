const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('postgres', 'postgres', 'password', {
  host: 'localhost',
  dialect: 'postgres',
  port: 5432
});

// Import models
const ExternalSystem = require('./externalSystem.model')(sequelize, DataTypes);
const Planner = require('./planner.model')(sequelize, DataTypes);
const Fund = require('./fund.model')(sequelize, DataTypes);
const Source = require('./source.model')(sequelize, DataTypes);
const Run = require('./run.model')(sequelize, DataTypes);
const Report = require('./report.model')(sequelize, DataTypes);
const PlannerFunds = require('./junctions/plannerFunds.model')(sequelize, DataTypes);
const PlannerSources = require('./junctions/plannerSources.model')(sequelize, DataTypes);
const PlannerRuns = require('./junctions/plannerRuns.model')(sequelize, DataTypes);
const PlannerReports = require('./junctions/plannerReports.model')(sequelize, DataTypes);

// Define associations
ExternalSystem.hasMany(Planner, { foreignKey: 'externalSystemId', as: 'planners' });

Planner.belongsTo(ExternalSystem, { foreignKey: 'externalSystemId', as: 'externalSystemConfig' });

// Planner.belongsToMany(Fund, {
//   through: PlannerFunds,
//   foreignKey: 'plannerId',
//   otherKey: 'fundId',
//   as: 'funds'
// });

// Planner.belongsToMany(Source, {
//   through: PlannerSources,
//   foreignKey: 'plannerId',
//   otherKey: 'sourceId',
//   as: 'sources'
// });

// Planner.belongsToMany(Run, {
//   through: PlannerRuns,
//   foreignKey: 'plannerId',
//   otherKey: 'runId',
//   as: 'runs'
// });

// Planner.belongsToMany(Report, {
//   through: PlannerReports,
//   foreignKey: 'plannerId',
//   otherKey: 'reportId',
//   as: 'reports'
// });

// Export models and sequelize instance
const db = {
  sequelize,
  Sequelize,
  ExternalSystem,
  Planner,
  Fund,
  Source,
  Run,
  Report,
  PlannerFunds,
  PlannerSources,
  PlannerRuns,
  PlannerReports
};

module.exports = db;