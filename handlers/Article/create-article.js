const { Article } = require('../../models');

/**
 * @openapi
 * /article:
 *   post:
 *     description: Create an article
 *     tags:
 *       - article
 *     consumes:
 *       - application/json
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *              - title
 *              - description
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 title: 
 *                   type: string
 *                   example: string 
 *                 description: 
 *                   type: string
 *                   example: string
 *                 id: 
 *                   type: number
 *                   example: 1  
 *       400:
 *         description: Bad input / Missing parameter
 */

module.exports = async (req, res) => {
	if (!req.body.title) {
		res.status(400);
		res.send(JSON.stringify({ error: 'MISSING_FIELD_TITLE' }));
		return;
	}

	if (typeof req.body.description !== 'string' || req.body.title.length > 500) {
		res.status(400);
		res.send(JSON.stringify({error: 'INVALID_TITLE_FIELD'}));
		return;
	}

	if (!req.body.description) {
		res.status(400);
		res.send(JSON.stringify({ error: 'MISSING_FIELD_DESCRIPTION' }));
		return;
	}
	if (typeof req.body.description !== 'string' || req.body.description.length > 5000) {
		res.status(400);
		res.send(JSON.stringify({error: 'INVALID_FIELD_DESCRIPTION'}));
		return;
	}

	const token = await Article.create({
		title: req.body.title,
		description: req.body.description,
	}).catch((err) => {
		res.status(400);
		res.send(JSON.stringify({ error: err['message'] }));
	});

	if (!token) return;

	res.send(
		JSON.stringify(
			(({ id, title, description }) => ({ id, title, description }))(token)
		)
	);
};
