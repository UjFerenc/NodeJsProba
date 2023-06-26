const { Article } = require('../../models');

/**
 * @openapi
 * /article-list:
 *   get:
 *     description: Lists articles
 *     tags:
 *       - article
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: query
 *         name: page
 *         description: The page number
 *         schema:
 *           type: integer
 *           minimum: 1
 *         required: true
 *       - in: query
 *         name: pageSize
 *         description: The number of elements in the page
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
 *                 list: 
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       title:
 *                         type: string
 *                         example: string
 *                       id:
 *                         type: number
 *                         example: 1
 *                 meta: 
 *                   type: object
 *                   properties:
 *                    pageSize:
 *                      type: number
 *                      example: 1
 *                    pageCount:
 *                      type: number
 *                      example: 1
 *                    page:
 *                      type: number
 *                      example: 1  
 *                    count:
 *                      type: number
 *                      example: 1  
 *       400:
 *         description: Bad input / Missing parameter
 */

module.exports = async (req, res) => {
	if (!req.query.pageSize) {
		res.status(400);
		res.send(JSON.stringify({ error: 'MISSING_FIELD_PAGE_SIZE' }));
		return;
	}

	if (isNaN(req.query.pageSize) || !req.query.pageSize > 0) {
		res.status(400);
		res.send(JSON.stringify({ error: 'INVALID_FIELD_PAGE_SIZE' }));
		return;
	}

	if (!req.query.page) {
		res.status(400);
		res.send(JSON.stringify({ error: 'MISSING_FIELD_PAGE' }));
		return;
	}

	if (isNaN(req.query.page) || !req.query.page > 0) {
		res.status(400);
		res.send(JSON.stringify({ error: 'INVALID_FIELD_PAGE' }));
		return;
	}

	const articleList = await Article.findAndCountAll({
		limit: Number(req.query.pageSize),
		offset: req.query.pageSize * (req.query.page - 1),
	}).catch((err) => {
		res.status(400);
		res.send(JSON.stringify(err['message']));
		return;
	});
	

	if (!articleList) return;

	res.send(JSON.stringify({
		list: articleList.rows, 
		meta: {
			pageSize: req.query.pageSize,
			pageCount: Math.ceil(articleList.count / req.query.pageSize),
			page: req.query.page,
			count: articleList.count
		}
	}));
};
