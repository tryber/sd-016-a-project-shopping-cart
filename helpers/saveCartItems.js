const saveCartItems = (save) => {
  // seu código aqui
  const savedCart = [];
  save.childNodes.forEach((item) => {
    savedCart.push({ product: item.innerHTML });
  });

  localStorage.setItem('cartItems', JSON.stringify(savedCart));
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
