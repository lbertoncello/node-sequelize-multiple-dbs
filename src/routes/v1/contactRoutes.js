const express = require('express');
const router = express.Router();

const auth = require('@middlewares/auth');
const contactController = require('@controllers/v1/ContactController');

router.get(
	contactController.routes.show,
	auth.user,
	contactController.show,
);

router.post(
	contactController.routes.store,
	auth.user,
	contactController.store,
);

module.exports = router;
