const getSavedCartItems = () => {
  // seu código aqui
  const storage = localStorage.getItem('cartItems');
  const cart = document.getElementsByClassName('cart__items')[0];
  if (cart !== undefined)cart.outerHTML = storage;
};

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
