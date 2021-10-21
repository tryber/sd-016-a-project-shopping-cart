const saveCartItems = () => {
  const cartItensElement = document.querySelector('.cart__items');
  const text = cartItensElement.innerHTML;
  localStorage.setItem('cartItems', JSON.stringify(text));
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
