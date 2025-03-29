const express = require('express');
const router = express.Router();
const { getNotes } = require('../controllers/noteController');

router.get('/notes', getNotes);

module.exports = router;
