const { ValidationError } = require('../errors/customErrors');

const validateProduct = (req, res, next) => {
  const { name, description, price, category, inStock } = req.body;

  if (!name || typeof name !== 'string' || name.trim() === '') {
    return next(new ValidationError('Name is required and must be a non-empty string'));
  }
  if (!description || typeof description !== 'string' || description.trim() === '') {
    return next(new ValidationError('Description is required and must be a non-empty string'));
  }
  if (typeof price !== 'number' || price < 0) {
    return next(new ValidationError('Price is required and must be a non-negative number'));
  }
  if (!category || typeof category !== 'string' || category.trim() === '') {
    return next(new ValidationError('Category is required and must be a non-empty string'));
  }
  if (typeof inStock !== 'boolean') {
    return next(new ValidationError('inStock is required and must be a boolean'));
  }

  next();
};

module.exports = validateProduct;