const express = require('express');
const router = express.Router();

const BaseController = require('@controllers/v1/BaseController');
const baseController = new BaseController();

/* GET home page. */
router.get(BaseController.routes().root, baseController.root());

module.exports = router;
