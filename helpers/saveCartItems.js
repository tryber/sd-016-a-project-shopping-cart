const saveCartItems = (itemsSaave) => {
  localStorage.setItem('cartItems', JSON.stringify(itemsSaave.innerHTML));
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
