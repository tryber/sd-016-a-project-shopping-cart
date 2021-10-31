const getSavedCartItems = (object, calbeck) => {
  // seu código aquicons
  if (object !== null) {
  const rr = localStorage.getItem('cartItems');
  const iii = JSON.parse(rr);
  const cariten = document.querySelector('.cart__items');
  iii.map((ele) => cariten.appendChild(calbeck(ele.id, ele.sku, ele.name, ele.price)));
  } 
};

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
