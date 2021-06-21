const express = require('express');
const router = express.Router();

const auth = require('@middlewares/auth');
const userController = require('@controllers/v1/UserController');

router.get(
	userController.routes.detail,
	auth.user,
	userController.detail,
);
router.get(
	userController.routes.detailById,
	auth.admin,
	userController.detailById,
);
router.get(
	userController.routes.read,
	auth.admin,
	userController.detailById,
);
router.post(
	userController.routes.create,
	auth.admin,
	userController.create,
);
router.post(
	userController.routes.vote,
	auth.user,
	userController.vote,
);
router.put(
	userController.routes.update,
	auth.user,
	userController.update,
);
router.put(
	userController.routes.updateById,
	auth.admin,
	userController.updateById,
);
router.put(
	userController.routes.activate,
	auth.admin,
	userController.activate,
);
router.put(
	userController.routes.deactivate,
	auth.admin,
	userController.deactivate,
);

module.exports = router;
