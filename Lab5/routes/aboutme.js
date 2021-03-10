const express = require('express');
const router = express.Router();
const data = require('../data');

router.get('/', async (req, res) => {
    try {
      const aboutmeObj = {
        "name": "Allen Best",
        "cwid": "10420443",
        "biography": "A senior that has a high energy level, the ability to communicate effectively, and critical-thinking/reasoning abilities. I have recently had internships at NBCU and BNY Mellon and looking to start my full time position in the comming year.\n I enjoy designing, coding and modifying websites from layout to function. In my free time I work on a graohics page for my favorite football team(New York Jets) where I was able to get a following.",
        "favoriteShows": ["Wandavision", "The Flash", "The Good Place", "Rythom + Flow"]
      };

      res.json(aboutmeObj);
    } catch (e) {
      res.status(500).send();
    }
});

module.exports = router;