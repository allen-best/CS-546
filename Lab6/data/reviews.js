const mongoCollections = require('../config/mongoCollections');
const reviews = mongoCollections.reviews;
const books = mongoCollections.books;

const uuid = require('uuid');
const ObjectId = require('mongodb').ObjectID;

const getBook = async (bookId) => {
    const booksData = require('./books');
    const bookInfo = await booksData.getBook(bookId);
    return bookInfo // this will be the array of people objects
}

const errorThrowCreate = ( body ) => {
    if(body.title === undefined || body.reviewer === undefined || body.rating === undefined || body.dateOfReview === undefined
        || body.review === undefined){
        throw 'You must provide a value for all inputs.'; 
    }

    if(typeof(body.title) !== "string" || typeof(body.reviewer) !== "string" || typeof(body.review) !== "string"
        || body.title === "" || body.summary === ""){
        throw 'You must provide a string value for title, reviewer and review.'; 
    }

    if(typeof(body.rating) !== "number" || body.rating < 1 || body.rating > 5 || body.rating % 1 !== 0){
        throw 'You must provide a valid rating'; 
    }

    if(isNaN(Date.parse(body.dateOfReview))) throw 'You must provide a date of review'; 
}

const errorThrowID = ( id ) => {
    if(id === undefined || typeof(id) !== "string" || id === "" || !ObjectId.isValid(id)) throw 'Error: Invalid ID.'
}

const createReview = async (bookId, body) => {
    errorThrowCreate(body);
    errorThrowID(bookId);

    const reviewId = new ObjectId();
    let newReview = {
        _id: reviewId,
        title: body.title,
        reviewer: body.reviewer,
        rating: body.rating,
        dateOfReview: body.dateOfReview,
        review: body.review
    };

    const bookCollection = await books();

    const updatedInfo = await bookCollection.updateOne(
        { _id: ObjectId(bookId) },
        { $push: {"reviews": newReview }}
    );
    if (updatedInfo.modifiedCount === 0) {
        throw 'Could not update book successfully';
    }

    const bookInfo = await getBook(bookId);

    return bookInfo;
}

const getAllReviews = async (bookId) => {
    errorThrowID(bookId);
    const bookCollection = await books();
    const book = await bookCollection.findOne({ _id: ObjectId(bookId) });

    if (!book) throw 'Could not find book with id of ' + bookId;

    return book.reviews;
}

const getReview = async (id) => {
    errorThrowID(id);
    const bookCollection = await books();
    const book = await bookCollection.aggregate([
    {
        $project: {
            _id: 0,
            reviews: { 
                $filter: {
                    input: "$reviews",
                    as: "review",
                    cond: { 
                        $eq: [ "$$review._id", ObjectId(id) ]
                    }
                },
            }
        
        }
    }
    ]).toArray();

    let result = undefined;
    book.forEach(element => {
        if(element.reviews.length >= 1) result = element.reviews[0];
    });

    if (!result) {
        throw 'Could not find book with id of ' + id;
    }
    return result;
}

const removeReview = async (id) => {
    errorThrowID(id);
    const bookCollection = await books();
    const deletionInfo = await bookCollection.findOneAndUpdate(
        { reviews: { $elemMatch : { _id : ObjectId(id) } } },
        { $pull: { reviews: { _id: ObjectId(id) } }}
    );
    if (deletionInfo.modifiedCount === 0) throw `Could not delete review with id of ${id}`;

    return { bookId: id, deleted: true };
}

module.exports = {
    createReview,
    getAllReviews,
    getReview,
    removeReview
};