const getSavedCartItems = (key) => {
  return localStorage.getItem(key);
};

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
