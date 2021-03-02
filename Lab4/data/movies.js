const mongoCollections = require('../config/mongoCollections');
const ObjectId = require('mongodb').ObjectID;
const movies = mongoCollections.movies;

const digits = (num, count = 0) => num ? digits(Math.floor(num/10), ++count) : count;

const errorThrowCreate = ( title, plot, rating, runtime, genre, cast, info ) => {
    if(title === undefined || plot === undefined || rating === undefined || runtime === undefined
        || genre === undefined || cast === undefined || info === undefined){
        throw 'Error: You must provide a value for all inputs.'; 
    }

    if(typeof(title) !== "string" || typeof(plot) !== "string" || typeof(rating) !== "string" || typeof(genre) !== "string"
        || title === "" || plot === "" || rating === "" || genre === ""){
        throw 'Error: You must provide a string value for title, plot, rating and genre.'; 
    }

    if(cast === undefined || !Array.isArray(cast) || cast.length < 1 || !cast.every( e => typeof(e) === "string" && e !== "")){
        throw 'Error: You must provide a valid cast'; 
    }

    if(info === undefined || typeof(info) !== "object" || Object.keys(info).length === 0) throw 'Error: You must provide a valid info object';
    if(info.director === undefined || typeof(info.director) !== "string" || info.director === "") throw 'Error: You must provide a valid info director';
    if(info.yearReleased === undefined || typeof(info.yearReleased) !== "number" || digits(info.yearReleased) !== 4
        || info.yearReleased < 1930 || info.yearReleased > new Date().getFullYear() + 5){
        throw 'Error: You must provide a valid info yearReleased'; 
    }
}

const errorThrowID = ( id ) => {
    if(id === undefined || typeof(id) !== "string" || id === "" || !ObjectId.isValid(id)) throw 'Error: Invalid ID.'
}

const errorThrowTitle = ( newTitle ) => {
    if(newTitle === undefined || typeof(newTitle) !== "string" || newTitle === "") throw 'Error: Invalid title.'
}

const get = async id => {
    errorThrowID(id);


    let findMovie = {
        _id: ObjectId(id)
    };

    const movieCollection = await movies();
    const movie = await movieCollection.findOne(findMovie);
    if (movie === null) throw 'No movie with that id';

    return movie;
}

const create = async (title, plot, rating, runtime, genre, cast, info) => {
    errorThrowCreate( title, plot, rating, runtime, genre, cast, info );

    const movieCollection = await movies();

    let newMovie = {
        title: title, 
        plot: plot, 
        rating: rating, 
        runtime: runtime, 
        genre: genre, 
        cast: cast, 
        info:info
    };

    const insertInfo = await movieCollection.insertOne(newMovie);
    if (insertInfo.insertedCount === 0) throw 'Could not add movie';

    const newId = ObjectId(insertInfo.insertedId).toString();

    const movie = await get(newId);
    return movie;

}

const getAll = async () => {
    const movieCollection = await movies();

    const movieList = await movieCollection.find({}).toArray();

    return movieList;
}

const remove = async (id) => {
    errorThrowID(id);

    let findMovie = {
        _id: ObjectId(id)
    };

    const movieCollection = await movies();
    const deletionInfo = await movieCollection.deleteOne(findMovie);

    if (deletionInfo.deletedCount === 0) {
      throw `Could not delete movie with id of ${id}`;
    }
    return { deleted: true };
}

const rename = async (id, newTitle) => {
    errorThrowID(id);
    errorThrowTitle(newTitle);

    const movieCollection = await movies();
    const updatedMovie = {
      title: newTitle
    };

    const updatedInfo = await movieCollection.updateOne(
      { _id: ObjectId(id) },
      { $set: updatedMovie }
    );
    if (updatedInfo.modifiedCount === 0) {
      throw 'Could not update movie successfully';
    }

    return await get(ObjectId(id).toString());
  }

module.exports = {
    get,
    create,
    getAll,
    remove,
    rename
};