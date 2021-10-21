const getSavedCartItems = () => {
  const result = Object.values(localStorage);
  return result;
};

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
