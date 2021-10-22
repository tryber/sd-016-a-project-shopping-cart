const getSavedCartItems = () => {
    const itemsCart = document.querySelector('.cart__items');
    const restoreList = JSON.parse(localStorage.getItem('cartItems'));
    if (restoreList !== null) {
      itemsCart.innerHTML = restoreList;
    }
};

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
