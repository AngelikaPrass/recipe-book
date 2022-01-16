const mongoClient = require('mongodb').MongoClient;
const url = 'mongodb://127.0.0.1:27017';

const dbname = 'fd-projekt';
const recipeCollection = 'recipes';
const cuisineCollection = 'cuisines';
const file1 = require('./recipes.json');
const file2 = require('./cuisines.json');

async function addToDb(fileToAdd, collectionToAdd) {
  mongoClient.connect(url, {}, (error, clientDb) => {
    if (error) console.log(`no connection`);

    const db = clientDb.db(dbname);

    try {
      db.collection(collectionToAdd).insertMany(fileToAdd);

      console.log(`data has been added to ${collectionToAdd}`);
    } catch (err) {
      console.log(err);
    }
  });
}

addToDb(file2, cuisineCollection);
addToDb(file1, recipeCollection);
