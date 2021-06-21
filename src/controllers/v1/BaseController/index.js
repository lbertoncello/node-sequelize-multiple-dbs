class BaseController {

	static routes () {
		return {
			root: '/',
		};
	}

	root () {
		return function (req, res) {
			res.render('index.html');
		};
	}

}

module.exports = BaseController;
