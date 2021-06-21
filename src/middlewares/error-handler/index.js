function errorHandler (app) {
	app.use(function (request, response, next) {
		return response.status(404).send({
			success: false,
			message: 'NOT FOUND',
		});
	});

	app.use(function (error, request, response, next) {
		console.error(error);

		return response.status(error.status || 500).send({
			error: {
				success: false,
				message: error.message,
			},
		});
	});
}

module.exports = errorHandler;
