const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

const data = require('../data');
const usersData = data.users;

router.post('/', async (req, res) => {
    try{
        const { username, password } = req.body;
        console.log(username, password);
        usersData.forEach(async user => {
            if(user.username === username){
                try{
                    let match = await bcrypt.compare(password, user.hashedPassword, (err, result) =>  {
                        if(result) {
                            req.session.AuthCookie = user;
                            res.redirect('/private');
                        }else{
                            res.status(401).render("home/static", {title: "Login", error: true});
                        }
                    });
                }catch(error){
                    console.log(error);
                    throw("Promise rejection")
                }
            }
        });
    }catch(error){
        console.log(error);
    }
});

module.exports = router;