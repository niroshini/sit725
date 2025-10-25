const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/foodDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//const Book = require('../models/book.model');
const foodItems = require('../models/foodModel');

// const ProjectSchema = new mongoose.Schema({
//   title: String,
//   image: String,
//   link: String,
//   description: String,
// });

//const Project = mongoose.model('Project', ProjectSchema);

const sampleData = [
  {
    id: "f1",
    name: "Margherita Pizza",
    price: "12.50",
    currency: "AUD"
  },
  {
    id: "f2",
    name: "Beef Burger",
    price: "14.90",
    currency: "AUD"
  },
  {
    id: "f3",
    name: "Chicken Caesar Salad",
    price: "11.20",
    currency: "AUD"
  },
  {
    id: "f4",
    name: "Veggie Wrap",
    price: "9.80",
    currency: "AUD"
  },
  {
    id: "f5",
    name: "Flat White Coffee",
    price: "4.50",
    currency: "AUD"
  }
];




// Project.insertMany(sampleData)
//   .then(() => {
//     console.log("Sample data inserted");
//     mongoose.connection.close();
//   })
//   .catch(err => console.error(err));


// scripts/seed.js


(async () => {
  try {
    // 3) ensure unique on id (good practice)
    await foodItems.collection.createIndex({ id: 1 }, { unique: true });

    // 4) clear and insert
    await foodItems.deleteMany({});
    await foodItems.insertMany(sampleData);

    console.log('Seeded 5 food items.');
  } catch (err) {
    console.error('Seeding failed:', err.message);
  } finally {
    await mongoose.connection.close();
    process.exit(0);
  }
})();
