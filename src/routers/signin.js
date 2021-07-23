const express = require("express");

const {lognin,logout} = require('../controllers/signinController');

const router = express.Router();

router.post('/lognin', lognin);
router.get('/logout', logout);

module.exports = router;