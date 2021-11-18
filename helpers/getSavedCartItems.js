const getSavedCartItems = () => {
  // seu código aqui
  const localStorageRestore = localStorage.getItem('cartItems');
  return localStorageRestore;
};

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
