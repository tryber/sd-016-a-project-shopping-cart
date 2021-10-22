const getSavedCartItems = () => {
  if (localStorage.getItem('cartItems') === null) {
    return localStorage.setItem('phrases', JSON.stringify([]));
  }
  return localStorage.getItem('cartItems');
};

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
