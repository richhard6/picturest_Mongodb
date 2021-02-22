const removeElementFromArray = (element, array) => {
  return array.filter((item) => item !== element);
};

module.exports = { removeElementFromArray };
