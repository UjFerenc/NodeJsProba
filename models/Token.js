const { Sequelize } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
	const Token = sequelize.define('Token', {
		id: {
			type: Sequelize.UUID,
			defaultValue: Sequelize.UUIDV4,
			primaryKey: true,
		},
		remaining: {
			type: DataTypes.INTEGER,
			allowNull: false,
			validate: {
				notEmpty: true,
				max: 5,
			},
			defaultValue: 5,
		},
		platformType: {
			type: DataTypes.STRING(7),
			allowNull: false,
			validate: {
				notEmpty: true,
				isIn: [['ANDROID', 'IOS', 'WEB']],
			},
		},
	});

	return Token;
};
