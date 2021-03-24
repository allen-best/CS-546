const dbConnection = require('../config/mongoConnection');
const data = require('../data/');
const books = data.books;
const reviews = data.reviews;

const main = async () => {
  const db = await dbConnection();
  await db.dropDatabase();
  const billBook = await books.createBook("Bill and Ted Face the Music",{authorFirstName: "first name", authorLastName: "last name"},["genre1", "genre2"], "1/28/1977","Jack Torrance’s new job at the Overlook Hotel is the perfect chance for a fresh start.");
  const id = billBook._id;
  const firstReview = await reviews.createReview(
    id, 
    {
        "title": "This book scared me to death!!", 
        "reviewer": "scaredycat", 
        "rating": 5, 
        "dateOfReview": "10/7/2020",
        "review": "This book was creepy!!! It had me at the edge of my seat.  One of Stephan King's best works!"
    }
  );
  const second = await reviews.createReview(
    id, 
    {
        "title": "Crazy Book!!", 
        "reviewer": "crzmaster", 
        "rating": 4, 
        "dateOfReview": "10/7/2020",
        "review": "This book was crazy!!!"
    }
  );
  const third = await reviews.createReview(
    id, 
    {
        "title": "Wasn't my favorite", 
        "reviewer": "bleh", 
        "rating": 2, 
        "dateOfReview": "10/7/2020",
        "review": "This book was alright. Nothing too crazy!"
    }
  );
  console.log('Done seeding database');
  await db.serverConfig.close();
};

main().catch(console.log);