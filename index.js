const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

mongoose.set('strictQuery', false);
const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    // return Recipe.create({ title: 'Brownie', level: 'Easy Peasy', ingredients: ['chocolate', 'flour'], cuisine: 'Kitchen', dishType: 'dessert', duration: 30, creator: 'Gerard' })
    return Recipe.insertMany(data);
  })
  .then((lastCreatedArr) => {
    lastCreatedArr.forEach(recipe => console.log(recipe.title));
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
