const mongoCollections = require('../config/mongoCollections');
const books = mongoCollections.books;
const reviews = require('./reviews');

const ObjectId = require('mongodb').ObjectID;

const errorThrowCreate = ( body ) => {
    if(body.title === undefined || body.author === undefined || body.datePublished === undefined || body.summary === undefined
        || body.genre === undefined){
        throw 'You must provide a value for all inputs.'; 
    }

    if(typeof(body.title) !== "string" || isNaN(Date.parse(body.datePublished)) || typeof(body.summary) !== "string"
        || body.title === "" || body.summary === ""){
        throw 'You must provide a string value for title and summary.'; 
    }

    if(body.genre === undefined || !Array.isArray(body.genre) || body.genre.length < 1 || !body.genre.every( e => typeof(e) === "string" && e !== "")){
        throw 'You must provide a valid genre'; 
    }

    if(body.author === undefined || typeof(body.author) !== "object" || Object.keys(body.author).length === 0) throw 'You must provide a valid author object';
    if(body.author.authorFirstName === undefined || typeof(body.author.authorFirstName) !== "string" || body.author.authorFirstName === "") throw 'You must provide a valid author first name';
    if(body.author.authorLastName === undefined || typeof(body.author.authorLastName) !== "string" || body.author.authorLastName === "") throw 'You must provide a valid author last name';
}

const errorThrowID = ( id ) => {
    if(id === undefined || typeof(id) !== "string" || id === "" || !ObjectId.isValid(id)) throw 'Error: Invalid ID.'
}

const createBook = async (body) => {
    errorThrowCreate(body);

    const bookCollection = await books();

    let newBook = {
        title: body.title,
        author: body.author,
        genre: body.genre,
        datePublished: body.datePublished,
        summary: body.summary,
        reviews: []
    };

    const insertInfo = await bookCollection.insertOne(newBook);
    if (insertInfo.insertedCount === 0) throw 'Could not add book';

    const newId = ObjectId(insertInfo.insertedId).toString();

    const book = await getBook(newId);
    let updatedIdBook = book;
    updatedIdBook._id = ObjectId(updatedIdBook._id).toString();
    return updatedIdBook;
}

const getAllBooks = async () => {
    const bookCollection = await books();
    return await bookCollection.find({}, {projection:{ "author": 0, "genre": 0, "datePublished": 0, "summary": 0, "reviews": 0 }} ).toArray();
}

const getBook = async (id) => {
    if (id === undefined) throw 'You must provide an ID';
    const bookCollection = await books();
    console.log(id);
    const book = await bookCollection.findOne({ _id: ObjectId(id) });

    if (!book) throw 'Could not find book with id of ' + id;
    let updatedIdBook = book;
    updatedIdBook._id = ObjectId(updatedIdBook._id).toString();
    return updatedIdBook;
}

const removeBook = async (id) => {
    errorThrowID(id);

    let findBook = {
        _id: ObjectId(id)
    };

    const bookCollection = await books();
    const deletionInfo = await bookCollection.deleteOne(findBook);

    if (deletionInfo.deletedCount === 0) {
        throw `Could not delete book with id of ${id}`;
    }

    return { bookId: id, deleted: true };
}

const updateBook = async (id, body) => {
    errorThrowID(id);
    errorThrowCreate(body);

    const bookCollection = await books();
    const updatedBook = {
        title: body.title,
        author: body.author,
        genre: body.genre,
        datePublished: body.datePublished,
        summary: body.summary
    };

    const updatedInfo = await bookCollection.updateOne(
        { _id: ObjectId(id) },
        { $set: updatedBook }
    );
    if (updatedInfo.modifiedCount === 0) throw 'Could not update book successfully';

    const book = await getBook(id);
    let updatedIdBook = book;
    updatedIdBook._id = ObjectId(updatedIdBook._id).toString();
    return updatedIdBook;
}

const updatePartialBook = async (id, body) => {
    errorThrowID(id);

    const bookCollection = await books();

    const updatedInfo = await bookCollection.updateOne(
        { _id: ObjectId(id) },
        { $set: body }
    );
    if (updatedInfo.modifiedCount === 0) throw 'Could not update book successfully';
    
    const book = await getBook(ObjectId(id).toString());
    let updatedIdBook = book;
    updatedIdBook._id = ObjectId(updatedIdBook._id).toString();
    return updatedIdBook;
}

module.exports = {
    createBook,
    getAllBooks,
    getBook,
    removeBook,
    updateBook,
    updatePartialBook
}
