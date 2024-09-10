module.exports = (sequelize, DataTypes) => {
	const PlannerRuns = sequelize.define('PlannerRuns', {
		plannerId: { type: DataTypes.INTEGER, allowNull: false },
		runId: { type: DataTypes.INTEGER, allowNull: false }
	});

	return PlannerRuns;
};