const getSavedCartItems = (callback, callback2) => {
  const olItems = document.querySelector('.cart__items');
  const total = document.querySelector('#price');
  const getPrice = localStorage.getItem('priceItems');
  const getItems = localStorage.getItem('cartItems');
  olItems.innerHTML = getItems;
  total.innerHTML = getPrice;
  callback2(Number(getPrice), 0);
  const liItems = document.querySelectorAll('.cart__item');
  liItems.forEach((item) => {
    item.addEventListener('click', callback);
  });
};

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
