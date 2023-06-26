const { Article } = require('../../models');

/**
 * @openapi
 * /article/{id}:
 *   get:
 *     description: Create an article
 *     tags:
 *       - article
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: id
 *         description: The id of the article
 *         schema:
 *           type: integer
 *           minimum: 1
 *         required: true
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
 *                   type: integer
 *                   example: 0  
 *       400:
 *         description: Bad input / Missing parameter
 */

module.exports = async (req, res) => {
	if (!req.params.id) {
		res.status(400);
		res.send(JSON.stringify({ error: 'MISSING_FIELD_ID' }));
		return;
	}

	if (isNaN(req.params.id)) {
		console.log(req.params.id);
		res.status(400);
		res.send(JSON.stringify({ error: 'INVALID_FIELD_ID' }));
		return;
	}

	//Az ORM generál 2 extra mezőt (createdAt, UpdatedAt) ami nem volt benne az outputban
	const article = await Article.findOne({
		attributes: ['id', 'title', 'description'],
		where: {
			id: req.params.id,
		},
	}).catch((err) => {
		res.send(400);
		res.send(JSON.stringify({ error: err['message'] }));
		return;
	});

	if (article === null) return;

	res.send(JSON.stringify(article));
};
