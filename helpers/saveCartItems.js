const saveCartItems = (arg) => {
  if (arg === undefined) {
    const lista = document.querySelectorAll('.cart__item');
    const array = [];
    lista.forEach((x) => array.push(x.outerHTML));
    localStorage.setItem('cartItems', JSON.stringify(array));
    console.log(localStorage.getItem('cartItems'));
  } else {
    localStorage.setItem('cartItems', arg);
  }
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
