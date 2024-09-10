module.exports = (sequelize, DataTypes) => {
	const PlannerFunds = sequelize.define('PlannerFunds', {
		plannerId: { type: DataTypes.INTEGER, allowNull: false },
		fundId: { type: DataTypes.INTEGER, allowNull: false }
	});

	return PlannerFunds;
};