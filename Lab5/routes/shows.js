const express = require('express');
const router = express.Router();
const data = require('../data');
const showsData = data.shows;

router.get('/:id', async (req, res) => {
  try {
    if (isNaN(Number(req.params.id)) || Number(req.params.id) % 1 !== 0 || Number(req.params.id) < 0) throw 'Invalid ID given to show route.';
    const shows = await showsData.getShowsById(req.params.id);
    res.json(shows);
  } catch (e) {
    res.status(404).json({ message: 'Shows not found. ' + e });
  }
});

router.get('/', async (req, res) => {
  try {
    const showsList = await showsData.getAllShows();
    res.json(showsList);
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;