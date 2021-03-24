const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const data = require('../data');
const reviewsData = data.reviewData;
const ObjectId = require('mongodb').ObjectID;
 
// create application/json parser
const jsonParser = bodyParser.json()

router.get('/:bookId', async (req, res) => {
  try {
    if (!req.params.bookId || !ObjectId.isValid(req.params.bookId)) throw 'Invalid ID given to review route.';
    const reviews = await reviewsData.getAllReviews(req.params.bookId);
    res.json(reviews);
  } catch (e) {
    res.status(404).json({ message: 'Reviews not found. ' + e });
  }
});

router.post('/:bookId', jsonParser, async (req, res) => {
    try {
        if (!req.body 
            || !req.body.hasOwnProperty("title")
            || !req.body.hasOwnProperty("reviewer")
            || !req.body.hasOwnProperty("rating")
            || !req.body.hasOwnProperty("dateOfReview")
            || !req.body.hasOwnProperty("review")) throw 'Invalid request body given to route.';

        try {
            const inputBody = req.body;
            if (!req.params.bookId || !ObjectId.isValid(req.params.bookId)) throw 'Invalid ID given to review route.';
            if (!inputBody.title || !inputBody.reviewer || !inputBody.rating || !inputBody.dateOfReview || !inputBody.review) throw 'All fields need to be supplied to request body.';
            const reviews = await reviewsData.createReview(req.params.bookId, req.body);
            res.json(reviews);
        } catch (e) {
            res.status(404).json({ message: 'Reviews not found. ' + e });
        }
    } catch {
        console.log(e)
        res.status(400).send(e);
    }
});

router.get('/review/:reviewId', async (req, res) => {
    try {
        if (!req.params.reviewId || !ObjectId.isValid(req.params.reviewId)) throw 'Invalid ID given to review route.';
        const reviews = await reviewsData.getReview(req.params.reviewId);
        res.json(reviews);
    } catch (e) {
        res.status(404).json({ message: 'Reviews not found. ' + e });
    }
});

router.delete('/:reviewId', async (req, res) => {
    try {
        if (!req.params.reviewId || !ObjectId.isValid(req.params.reviewId)) throw 'Invalid ID given to review route.';
        const reviews = await reviewsData.removeReview(req.params.reviewId);
        res.json(reviews);
    } catch (e) {
        res.status(404).json({ message: 'Reviews not found. ' + e });
    }
});

module.exports = router;