const getSavedCartItems = (callback) => {
  const olItems = document.querySelector('.cart__items');
  const getItems = localStorage.getItem('cartItems');
  olItems.innerHTML = getItems;
  const liItems = document.querySelectorAll('.cart__item');
  liItems.forEach((item) => {
    item.addEventListener('click', callback);
  });
};

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
