const { Token } = require('../../models');

/**
 * @openapi
 * /token:
 *   post:
 *     description: Create a token
 *     tags:
 *       - token
 *     consumes:
 *       - application/json
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               platformType:
 *                 type: string
 *                 enum: [ANDROID, IOS, WEB]
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token: 
 *                   type: string
 *                   example: string
 *                 remaining:
 *                   type: number
 *                   example: 0  
 *       400:
 *         description: Bad input / Missing parameter
 */

module.exports = async (req, res) => {
	if (!req.body.platformType) {
		res.status(400);
		res.send(JSON.stringify({ error: 'MISSING_FIELD_PLATFORM_TYPE' }));
		return;
	}

	const token = await Token.create({
		platformType: req.body.platformType,
	}).catch((err) => {
		res.status(400);
		switch (err['message']) {
			case 'Validation error: Validation isIn on platformType failed':
				res.send(
					JSON.stringify({ error: 'PLATFORM_TYPE_MUST_BE_ELLEMENT_OF_ENUM' })
				);
				break;

			default:
				res.send(JSON.stringify(err['message']));
				break;
		}
	});

	if (!token) return;

	res.send(
		JSON.stringify((({ id, remaining }) => ({ token: id, remaining }))(token))
	);
};
