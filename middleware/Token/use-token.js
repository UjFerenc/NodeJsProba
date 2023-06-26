const { Token } = require('../../models');

module.exports = async (req, res, next) => {
	const authHeader = req.headers.authorization;

	if (!authHeader) {
		res.status(400);
		res.send(JSON.stringify('AUTH_TOKEN_NOT_FOUND'));
		return;
	}

	if (!authHeader.includes('Bearer ')) {
		res.status(400);
		res.send(JSON.stringify('AUTH_TOKEN_MUST_BE_BEARER'));
		return;
	}

	const bearerToken = authHeader.split('Bearer ')[1];

	const token = await Token.findOne({ where: { id: bearerToken } });
	if (token === null) {
		res.status(400);
		res.send(JSON.stringify({ error: 'AUTH_TOKEN_INVALID' }));
		return;
	}

	if (token.remaining < 1) {
		res.status(400);
		res.send(JSON.stringify({ error: 'AUTH_TOKEN_EXPIRED' }));
		return;
	}

	token.remaining = token.remaining - 1;
	token.save();

	next();
};
