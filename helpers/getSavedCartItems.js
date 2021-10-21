// const saveCartItems = require('./saveCartItems');

function cartItemClickListener(event) {
  if (event.target.className === 'cart__item') {
    event.target.remove();
  }
  // saveCartItems();
  const cartList = document.querySelector('.cart__items');
  const text = cartList.innerHTML;
  localStorage.setItem('cartItems', JSON.stringify(text));
}

const getSavedCartItems = () => {
  const getLocalStorage = JSON.parse(localStorage.getItem('cartItems'));
  const cartItensElement = document.querySelector('.cart__items');
  cartItensElement.innerHTML = getLocalStorage;
  cartItensElement.addEventListener('click', cartItemClickListener);
};

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
