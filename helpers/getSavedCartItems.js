const getSavedCartItems = () => {
  const localStorageInfo = localStorage.getItem('cartItems');
  const cart = document.querySelector('ol.cart__items');
  cart.innerHTML = localStorageInfo;

  const { children } = cart;
  Object.values(children).forEach((listItem) => {
    listItem.addEventListener('click', (event) => {
      event.target.remove();
    });
  });// add event listener to localStorage list items
};

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}