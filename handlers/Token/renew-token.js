const { Token } = require('../../models');

/**
 * @openapi
 * /renew-token:
 *   put:
 *     description: Refreshes a token
 *     tags:
 *       - token
 *     consumes:
 *       - application/json
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - token
 *             properties:
 *               token:
 *                 type: string
 *                 format: uuid
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 remaining: 
 *                   type: integer
 *                   example: 1  
 *       400:
 *         description: Bad input / Missing parameter
 */

module.exports = async (req, res) => {
	if (!req.body.token) {
		res.status(400);
		res.send(JSON.stringify({ error: 'MISSING_FIELD_TOKEN' }));
		return;
	}

	const token = await Token.findOne({ where: { id: req.body.token } });
	if (token === null) {
		res.status(400);
		res.send(JSON.stringify({ error: 'INVALID_TOKEN' }));
		return;
	}

	token.remaining = 5;
	token.save();

	res.send(JSON.stringify((({ remaining }) => ({ remaining }))(token)));
};
