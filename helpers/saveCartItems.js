const saveCartItems = () => {
  const productsInTheCart = {};
  // pega todos os filhos do pai 
  const listOfProducts = document.querySelectorAll('.cart__items');
  // código abaixo foi feito com auxílio do Ricardo Carvalho na sala de estudo em grupo
  listOfProducts.forEach((item, index) => {
    productsInTheCart[`Item ${index +1 }`] = item.innerText;
  })
  localStorage.setItem('cartItems', JSON.stringify(productsInTheCart));
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
