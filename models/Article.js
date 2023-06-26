module.exports = (sequelize, DataTypes) => {
	const Article = sequelize.define('Article', {
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		title: {
			type: DataTypes.STRING(100),
			allowNull: false,
			validate: {
				notEmpty: true,
				len: [0, 100],
			},
		},
		description: {
			type: DataTypes.STRING(5000),
			allowNull: false,
			validate: {
				notEmpty: true,
				len: [0, 5000],
			},
		},
	});

	return Article;
};
