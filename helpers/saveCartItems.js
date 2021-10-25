const saveCartItems = (arrayToLocalStorage, productItem) => {
  arrayToLocalStorage.push(productItem);
  localStorage.setItem('cartItems', JSON.stringify(arrayToLocalStorage));
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
