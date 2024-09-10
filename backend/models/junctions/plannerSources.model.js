module.exports = (sequelize, DataTypes) => {
	const PlannerSources = sequelize.define('PlannerSources', {
		plannerId: { type: DataTypes.INTEGER, allowNull: false },
		sourceId: { type: DataTypes.INTEGER, allowNull: false }
	});

	return PlannerSources;
};