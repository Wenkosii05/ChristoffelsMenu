//This be a reusable function that will be used across the application to reduce repeating the same code
  
export const validateDishForm = (fields) => {
  const { name, description, course, price } = fields;
  const errors = {};

  // Dish Name
  if (!name || !name.trim()) {
    errors.name = 'Dish name is required';
  } else if (name.trim().length < 2) {
    errors.name = 'Dish name must be at least 2 characters';
  } else if (name.trim().length > 60) {
    errors.name = 'Dish name must be less than 60 characters';
  }

  // Description
  if (!description || !description.trim()) {
    errors.description = 'Description is required';
  } else if (description.trim().length < 10) {
    errors.description = 'Description must be at least 10 characters';
  }

  // Course
  if (!course) {
    errors.course = 'Please select a course';
  }

  // Price
  if (price === '' || price === undefined || price === null) {
    errors.price = 'Price is required';
  } else if (isNaN(parseFloat(price))) {
    errors.price = 'Price must be a number';
  } else if (parseFloat(price) <= 0) {
    errors.price = 'Price must be greater than 0';
  } else if (parseFloat(price) > 99999) {
    errors.price = 'Price seems too high (max R99,999)';
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0,
  };
};

// Format price for display
export const formatPrice = (price) => {
  return `R ${parseFloat(price).toFixed(2)}`;
};

// Format date
export const formatDate = (dateString) => {
  if (!dateString) return 'Unknown';
  try {
    return new Date(dateString).toLocaleDateString('en-ZA', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  } catch {
    return 'Unknown';
  }
};