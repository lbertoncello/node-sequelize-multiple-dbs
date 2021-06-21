const express = require('express');
const router = express.Router();

const auth = require('@middlewares/auth');
const adminController = require('@controllers/v1/AdminController');

router.post(
	adminController.routes.create,
	auth.admin,
	adminController.create,
);
router.get(
	adminController.routes.detail,
	auth.admin,
	adminController.detail,
);
router.get(
	adminController.routes.detailById,
	auth.admin,
	adminController.detailById,
);
router.get(
	adminController.routes.read,
	auth.admin,
	adminController.detailById,
);
router.put(
	adminController.routes.update,
	auth.admin,
	adminController.update,
);
router.put(
	adminController.routes.updateById,
	auth.admin,
	adminController.updateById,
);
router.put(
	adminController.routes.activate,
	auth.admin,
	adminController.activate,
);
router.put(
	adminController.routes.deactivate,
	auth.admin,
	adminController.deactivate,
);

module.exports = router;
