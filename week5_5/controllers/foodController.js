// Import the service
const foodService = require('../services/foodService');

//Controller uses the service to get data
exports.getAllFood = async (_req, res, next) => {
  try {
    const items = await foodService.getAllFood();
    res.status(200).json({
      statusCode: 200,
      data: items,
      message: 'Food menu retrieved using service'
    });
  } catch (err) {
    next(err);
  }
};


