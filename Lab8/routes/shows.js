const express = require('express');
const router = express.Router();
const data = require('../data');
const showsData = data.shows;

router.get('/:id', async (req, res) => {
  try {
    if (isNaN(Number(req.params.id)) || Number(req.params.id) % 1 !== 0 || Number(req.params.id) < 0) throw 'Invalid ID given to show route.';
    const show = await showsData.getShowsById(req.params.id);
    const name = show.name;

    console.log(JSON.stringify(show))
    res.render('shows/static', {title: name, show:show });
  } catch (e) {
    res.status(404).render('shows/static', {show:null });
  }
});

module.exports = router;