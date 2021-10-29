const saveCartItems = (joe) => {
  // seu código aqui
  localStorage.setItem('cartItems', joe);
  localStorage.clear();
  const listJoe = document.querySelectorAll('.cart__item');
  const a = [];
  listJoe.forEach((e) => {
    a.push(e.textContent);
  });
  localStorage.setItem('cartItems', JSON.stringify(a));
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
