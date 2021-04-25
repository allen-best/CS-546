const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  res.render('private/static', {title:"Logged in User", user: req.session.AuthCookie});
});

module.exports = router;