module.exports = (sequelize, DataTypes) => {
	const PlannerReports = sequelize.define('PlannerReports', {
		plannerId: { type: DataTypes.INTEGER, allowNull: false },
		reportId: { type: DataTypes.INTEGER, allowNull: false }
	});

	return PlannerReports;
};