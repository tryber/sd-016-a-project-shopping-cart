const getSavedCartItems = (arrayToLocalStorage, callback) => {
  const cartSection = document.querySelector('.cart__items');
  const cartItems = JSON.parse(localStorage.getItem('cartItems'));
  cartItems.forEach((item) => {
    arrayToLocalStorage.push(item);
    cartSection.appendChild(callback(item));
  });
};

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
