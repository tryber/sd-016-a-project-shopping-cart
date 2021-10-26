// Agradecimento especial ao Carlos(T16) e Fumagalli(T16) que me ajudaram a chegar a uma melhor conclusão.
const getSavedCartItems = (callback) => {
  // seu código aqui
  if (localStorage.getItem('cartItems')) {
    const cartItems = document.querySelector('.cart__items');
    cartItems.innerHTML = localStorage.getItem('cartItems');
    cartItems.childNodes.forEach((item) => item.addEventListener('click', callback));
    return cartItems;
  }
};

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
