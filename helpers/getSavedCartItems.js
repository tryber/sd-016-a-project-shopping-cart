const getSavedCartItems = (callback) => {
  // seu código aqui
  if (localStorage.getItem('cartItems')) {
    const cartItems = document.querySelector('.cart__items');
    const storage = JSON.parse(localStorage.getItem('cartItems'));

    storage.forEach((items) => {
      const li = document.createElement('li');
      li.innerHTML = items.product;
      li.classList.add('cart__item');
      li.addEventListener('click', callback);
      cartItems.appendChild(li);
    });
  }
};

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
