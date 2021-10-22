const saveCartItems = (elementsItem) => {
  localStorage.setItem('cartItems', elementsItem);
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
