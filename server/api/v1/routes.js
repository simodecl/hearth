const express = require('express');
const router = express.Router();

router.get('*', v1Routes);

module.exports = router;