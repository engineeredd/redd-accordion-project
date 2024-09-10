module.exports = (sequelize, DataTypes) => {
	const Run = sequelize.define('Run', {
		runName: { type: DataTypes.STRING, allowNull: false }
	});

	return Run;
};