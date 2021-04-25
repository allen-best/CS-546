const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

router.get('/', async (req, res) => {
  try {
    title = "You have been logged out";
    req.session.destroy();
    res.redirect("/");
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;