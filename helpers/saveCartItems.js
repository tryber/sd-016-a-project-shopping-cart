const saveCartItems = () => {
  localStorage.clear();
  const cart = document.querySelector('ol.cart__items').children; // get cart list

  let idsString = '';
  for (let i = 0; i < cart.length; i += 1) {
    for (let j = 4; j < 18; j += 1) {
      idsString += cart[i].innerText[j];
    }
    idsString += ',';
  }
  
  localStorage.setItem('cartItems', idsString);
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
