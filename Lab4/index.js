const movies = require("./data/movies");
const connection = require('./config/mongoConnection');
const ObjectId = require('mongodb').ObjectID;

async function main() {
    let billAndTed;
    let justiceLeague;
    try{
        billAndTed = await movies.create("Bill and Ted Face the Music","Once told they'd save the universe during a time-traveling adventure, 2 would-be rockers from San Dimas, California find themselves as middle-aged dads still trying to crank out a hit song and fulfill their destiny.","PG-13", "1hr 31min","Comedy",["Keanu Reeves","Alex Winter"],{director: "Dean Parisot", yearReleased: 2020});
        console.log(billAndTed);
    } catch(e) {
        console.log("Got an error!");
        console.log(e);
    }
    try{
        justiceLeague = await movies.create("Justice League","Thousands of years ago, Steppenwolf and his legions of Parademons had attempted to take over the Earth using the combined energies of the three Mother Boxes.","PG-13", "2hr","Action",["Ben Affleck","Henry Cavill"],{director: "Zach Snyder", yearReleased: 2017});
    } catch(e) {
        console.log("Got an error!");
        console.log(e);
    }

    try{
        const allMovies = await movies.getAll();
        console.log(allMovies);
    } catch(e) {
        console.log("Got an error!");
        console.log(e);
    }
    try{
        const avengers = await movies.create("The Avengers","The Asgardian Loki encounters the Other, the leader of an extraterrestrial race known as the Chitauri. In exchange for retrieving the Tesseract,[N 2] a powerful energy source of unknown potential, the Other promises Loki an army with which he can subjugate Earth.","PG-13", "2hr 23min","Action",["Robert Downey Jr.","Chris Evans"],{director: "Joss Whedon", yearReleased: 2012});
        console.log(avengers);
    } catch(e) {
        console.log("Got an error!");
        console.log(e);
    }

    try{
        const renamedBillAndTed = await movies.rename(ObjectId(billAndTed._id).toString(), "Patrick and Ted Face the Music");
        console.log(renamedBillAndTed);
    } catch(e) {
        console.log("Got an error!");
        console.log(e);
    } 

    try{
        const rem = await movies.remove(ObjectId(justiceLeague._id).toString());
    } catch(e) {
        console.log("Got an error!");
        console.log(e);
    }

    // try{
    //     const remA = await movies.remove("60387c66cd41cefdb4818c90");
    //     const remB = await movies.remove("60387c66cd41cefdb4818c91");
    //     const remC = await movies.remove("60387c66cd41cefdb4818c92");
    // } catch(e) {
    //     console.log("Got an error!");
    //     console.log(e);
    // }

    try{
        const allMovies = await movies.getAll();
        console.log(allMovies);
    } catch(e) {
        console.log("Got an error!");
        console.log(e);
    }


    // // Try error
    
    try{
        const createErr = await movies.create("","Once told they'd save the universe during a time-traveling adventure, 2 would-be rockers from San Dimas, California find themselves as middle-aged dads still trying to crank out a hit song and fulfill their destiny.","PG-13", "1hr 31min","Comedy",[],{director: "Dean Parisot", yearReleased: 2020});
        console.log(createErr);
    } catch(e) {
        console.log("Got an error!");
        console.log(e);
    }
    
    try{
        const removeErr = await movies.remove("603745499e1188a09bbf638c");
        console.log(removeErr);
    } catch(e) {
        console.log("Got an error!");
        console.log(e);
    } 

    try{
        const renamedBillAndTed = await movies.rename("603745499e1188a09bbf638c", "Patrick and Ted Face the Music");
        console.log(renamedBillAndTed);
    } catch(e) {
        console.log("Got an error!");
        console.log(e);
    } 

    try{
        const renamedBillAndTed = await movies.rename(ObjectId(billAndTed._id).toString(), "");
        console.log(renamedBillAndTed);
    } catch(e) {
        console.log("Got an error!");
        console.log(e);
    } 

    try{
        const allMovies = await movies.get("603745499e1188a09bbf638c");
        console.log(allMovies);
    } catch(e) {
        console.log("Got an error!");
        console.log(e);
    }

    const db = await connection();
    await db.serverConfig.close();
    console.log("Done");
}

main();