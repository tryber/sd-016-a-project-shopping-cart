const getSavedCartItems = () => {
  const result = Object.values(localStorage)[0].split(',');
  return result;
};

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
