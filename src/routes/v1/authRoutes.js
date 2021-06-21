const express = require('express');
const router = express.Router();
const auth = require('@middlewares/auth');
const authController = require('@controllers/v1/AuthController');

router.post(
	authController.routes.login,
	authController.login,
);
router.post(
	authController.routes.logout,
	auth.allRoles,
	authController.logout,
);

module.exports = router;
