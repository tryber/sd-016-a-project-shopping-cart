const saveCartItems = (itenscart) => {
  const cartItensString = localStorage.getItem('cartItems');
  const cartItensArray = JSON.parse(cartItensString);
  cartItensArray.push(itenscart);
  const newJson = JSON.stringify(cartItensArray);
  localStorage.setItem('cartItems', newJson);
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
