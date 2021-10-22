const getSavedCartItems = () => {
  const savedCartItems = localStorage.getItem('cartItems');
  const cartItems = document.querySelector('.cart__items');
  cartItems.innerHTML = savedCartItems;
};

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
