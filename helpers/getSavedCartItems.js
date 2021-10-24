const getSavedCartItems = () => {
  // seu código aqui
  let cartItensString = localStorage.getItem('cartItems');
  if (!cartItensString) {
    cartItensString = '[]';
    localStorage.setItem('cartItems', cartItensString);
  }
  const cartItemsArray = JSON.parse(cartItensString);
  return cartItemsArray;
};

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
