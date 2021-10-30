const getSavedCartItems = (object, calbeck) => {
  // seu código aquicons
  if (object !== '') {
  const rr = localStorage.getItem('cartItems')
  const iii = JSON.parse(rr)
  const cariten = document.querySelector('.cart__items');
  iii.map((ele) => cariten.appendChild(calbeck(ele.id, ele.sku, ele.name, ele.price)));
  }
  else { return null }
};

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
