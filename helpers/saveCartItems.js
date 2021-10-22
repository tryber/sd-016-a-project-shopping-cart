const saveCartItems = () => {
  const itemsCart = document.querySelector('.cart__items');
  localStorage.setItem('cartItems', JSON.stringify(itemsCart.innerHTML));
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
