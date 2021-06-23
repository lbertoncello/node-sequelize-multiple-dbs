const express = require('express');
const router = express.Router();

const auth = require('@middlewares/auth');
const contactController = require('@controllers/v1/ContactController/postgre');

router.post(
	contactController.routes.store,
	auth.admin,
	contactController.store,
);


module.exports = router;
