module.exports = (sequelize, DataTypes) => {
	const Report = sequelize.define('Report', {
		reportType: { type: DataTypes.ENUM('ReportType1', 'ReportType2'), allowNull: false },
		reportName: { type: DataTypes.STRING, allowNull: false }
	});

	return Report;
};