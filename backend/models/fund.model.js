module.exports = (sequelize, DataTypes) => {
	const Fund = sequelize.define('Fund', {
		fundName: { type: DataTypes.STRING, allowNull: false },
		fundAlias: { type: DataTypes.STRING, allowNull: false }
	});

	Fund.associate = function(models) {
		Fund.hasMany(models.Planner, {
      through: 'PlannerFunds',
      foreignKey: 'fundId',
      otherKey: 'plannerId', 
      as: 'planners'
    });
	};

	return Fund;
};