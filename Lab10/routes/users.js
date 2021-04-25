const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

router.get('/', async (req, res) => {
    try {
        if (req.session.AuthCookie) {
            return res.redirect('private');
        }
        title = "Login"
        res.render('home/static', {title: title, error: false});
    } catch (e) {
        res.status(500).send();
    }
});

module.exports = router;