const foodItems = require('../models/foodModel');

async function getAllFood() {
  return foodItems.find({}).lean({ getters: true }); // price becomes "12.50"
}
  
  module.exports = {
    getAllFood
  };
  