const saveCartItems = () => {
  localStorage.clear()
  const cart = document.querySelector('ol.cart__items').children;  // get cart ol
  const cartListItems = [];
  for (let i = 0; i < cart.length; i += 1) {
    cartListItems.push(cart[i]);
  }
  const saveCart = {
    'cartItems': cartListItems,
  }
  console.log(saveCart);

  // CONTINUO AMANHA  
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
