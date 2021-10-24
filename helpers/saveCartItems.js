const saveCartItems = () => {
  // seu código aqui
  const savedCart = [];
  const cartItems = document.querySelectorAll('.cart__item');

  cartItems.forEach((item) => {
    savedCart.push({ product: item.innerHTML });
  });

  localStorage.setItem('cartItems', JSON.stringify(savedCart));
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
