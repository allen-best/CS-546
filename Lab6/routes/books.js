const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const data = require('../data');
const booksData = data.bookData;
const ObjectId = require('mongodb').ObjectID;

// create application/json parser
const jsonParser = bodyParser.json()

const bookFields = ["title", "author", "genre", "datePublished", "summary"];

router.get('/', async (req, res) => {
  try {
    const booksList = await booksData.getAllBooks();
    res.json(booksList);
  } catch (e) {
    res.status(500).send();
  }
});

router.post('/', jsonParser, async (req, res) => {
    try {
        console.log(typeof req.body)
        if (!req.body 
            || !req.body.hasOwnProperty("title")
            || !req.body.hasOwnProperty("author")
            || !req.body.hasOwnProperty("genre")
            || !req.body.hasOwnProperty("datePublished")
            || !req.body.hasOwnProperty("summary")
            || req.body.hasOwnProperty("reviews")) throw 'Invalid request body given to route.';

        try {
            const booksList = await booksData.createBook(req.body);
            res.json(booksList);
            res.status(200).send();
        } catch (e) {
            console.log(e)
            res.status(404).send(e);
        }
    } catch (e) {
        console.log(e)
        res.status(400).send(e);
    }
});

router.get('/:id', async (req, res) => {
    try {
        if (!req.params.id || !ObjectId.isValid(req.params.id)) throw 'Invalid ID given to book route.';
        const books = await booksData.getBook(req.params.id);
        res.json(books);
    } catch (e) {
        res.status(404).json({ message: 'Books not found. ' + e });
    }
});

router.put('/:id', jsonParser, async (req, res) => {
    try {
        if (!req.body 
            || !req.body.hasOwnProperty("title")
            || !req.body.hasOwnProperty("author")
            || !req.body.hasOwnProperty("genre")
            || !req.body.hasOwnProperty("datePublished")
            || !req.body.hasOwnProperty("summary")
            || req.body.hasOwnProperty("reviews")) throw 'Invalid request body given to route.';

        try {
            const inputBody = req.body;
            if (!req.params.id || !ObjectId.isValid(req.params.id)) throw 'Invalid ID given to book route.';
            if (!inputBody.title || !inputBody.author || !inputBody.genre || !inputBody.datePublished || !inputBody.summary) throw 'All fields need to be supplied to request body.';
            const books = await booksData.updateBook(req.params.id, inputBody);
            res.json(books);
        } catch (e) {
            res.status(404).json({ message: 'Books not found. ' + e });
        }
    } catch {
        console.log(e)
        res.status(400).send(e);
    }
});

router.patch('/:id', jsonParser, async (req, res) => {
    try {
        if (!(req.body.hasOwnProperty("title")
            || req.body.hasOwnProperty("author")
            || req.body.hasOwnProperty("genre")
            || req.body.hasOwnProperty("datePublished")
            || req.body.hasOwnProperty("summary")) 
            && req.body.hasOwnProperty("reviews")) throw 'Invalid request body given to route.';

        try {
            const inputBody = req.body;
            if (!req.params.id || !ObjectId.isValid(req.params.id)) throw 'Invalid ID given to book route.';
            for(k in inputBody) if(!bookFields.includes(k)) throw 'Correct fields need to be supplied to request body.'
            const books = await booksData.updatePartialBook(req.params.id, inputBody);
            res.json(books);
        } catch (e) {
            res.status(404).json({ message: 'Books not found. ' + e });
        }
    } catch {
        console.log(e)
        res.status(400).send(e);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        if (!req.params.id || !ObjectId.isValid(req.params.id)) throw 'Invalid ID given to book route.';
        const books = await booksData.removeBook(req.params.id);
        res.json(books);
    } catch (e) {
        res.status(404).json({ message: 'Books not found. ' + e });
    }
});

module.exports = router;