module.exports = [
	//#region Token
	{
		method: 'post',
		path: '/token',
		middleware: [],
		handlerLocation: './handlers/Token/create-token',
	},
	{
		method: 'put',
		path: '/renew-token',
		middleware: [],
		handlerLocation: './handlers/Token/renew-token',
	},
	//#endregion
	//#region Article
	{
		method: 'post',
		path: '/article',
		middleware: [],
		handlerLocation: './handlers/Article/create-article',
	},
	{
		method: 'get',
		path: '/article-list',
		middleware: [],
		handlerLocation: './handlers/Article/list-article',
	},
	{
		method: 'get',
		path: '/article/:id',
		middleware: ['./middleware/Token/use-token'],
		handlerLocation: './handlers/Article/detail-article',
	},
	//#endregion
];
