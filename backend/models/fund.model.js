module.exports = (sequelize, DataTypes) => {
	const Fund = sequelize.define('Fund', {
		fundName: { type: DataTypes.STRING, allowNull: false },
		fundAlias: { type: DataTypes.STRING, allowNull: false }
	});

	return Fund;
};