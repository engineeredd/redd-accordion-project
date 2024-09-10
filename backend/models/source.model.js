module.exports = (sequelize, DataTypes) => {
	const Source = sequelize.define('Source', {
		sourceName: { type: DataTypes.STRING, allowNull: false }
	});

	return Source;
};