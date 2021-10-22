const getSavedCartItems = (key = 'cartItems') => {
  // seu código aqui
  localStorage.getItem(key);
};

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
