const getSavedCartItems = () => {
  // seu código aqui
  const recoverList = localStorage.getItem('cartItems');

  return recoverList;
};

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
