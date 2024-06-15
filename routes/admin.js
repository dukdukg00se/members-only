const express = require('express');
const router = express.Router();

const admin_controller = require('../controllers/adminController');

router.get('/', admin_controller.index);

module.exports = router;
