const getSavedCartItems = (i) => {
  localStorage.getItem(i);
};

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
