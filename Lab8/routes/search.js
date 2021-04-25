const express = require('express');
const router = express.Router();
const data = require('../data');
const showsData = data.shows;

router.post('/', async (req, res) => {
    try {
        if(req.body.searchTerm === undefined 
            || req.body.searchTerm.length <= 0
            || !typeof(req.body.searchTerm) === "string"){
            throw 'Error: Invalid input'; 
        }
        const searchTerm = req.body.searchTerm;
        const shows = await showsData.getShowsBySearchTerm(searchTerm);
        const title = "Shows Found";

        if(!searchTerm.trim()){
            console.log("empty string entered in search");
            res.status(400).render('search/static', {title:"", searchTerm:"", shows:null, isEmpty:true });
        }

        res.render('search/static', {title: title, searchTerm:searchTerm, shows:shows.slice(0, 19), isEmpty:false});
    } catch (e) {
        res.status(404).render('search/static', {shows:null, isEmpty:false });
    }
});

module.exports = router;