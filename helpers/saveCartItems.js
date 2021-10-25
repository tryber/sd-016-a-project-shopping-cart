const saveCartItems = (elementsItem, priceItems) => {
  localStorage.setItem('cartItems', elementsItem);
  localStorage.setItem('priceItems', priceItems);
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
