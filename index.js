// Module imports
const bodyParser = require('body-parser');
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

// App setup
dotenv.config();
const app = express();

let corsOptions = {
	origin: process.env.CorsOrigins
		? process.env.CorsOrigins.split(',')
		: process.env.CorsOrigin,
};
app.use(cors(corsOptions));
app.use(bodyParser.json());

// Routes
const routes = require('./routes.js');

routes.forEach((route) => {
	const { method, path, middleware, handlerLocation } = route;
	app[method](
		path,
		...middleware.map((path) => require(path)),
		require(handlerLocation)
	);
});

//Swagger
const swaggerOptions = {
	swaggerDefinition: {
		openapi: '3.0.0',
		info: {
			title: 'Nodejs Proba feladat',
		},
		components: {
			securitySchemes: {
				bearerAuth: {
					type: 'http',
					in: 'header',
					name: 'Authorization',
					description:
						'Use created token bellow to gain access to restricted features',
					scheme: 'bearer',
					bearerFormat: 'UUID',
				},
			},
		},
		security: [
			{
				bearerAuth: [],
			},
		],
	},
	apis: routes.map((route) => route.handlerLocation + '.js'),
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

// Database Connection
const db = require('./models');
app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));
db.sequelize.sync();

// Server start
var server;

server = app.listen(process.env.PORT || 3306, () => {
	console.log('server is running on:' + server.address().port);
});

exports.modules = server;
