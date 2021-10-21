const getSavedCartItems = () => {
  // seu código aqui
  const itemsSaved = JSON.parse(localStorage.getItem('cartItems'))
  itemsSaved.forEach(item => {
    const li = createCustomElement('li', 'cart__item', item);
    li.addEventListener('click', cartItemClickListener);
    cartConteiner.appendChild(li);
  });
};

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
