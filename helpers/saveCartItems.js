const saveCartItems = () => {
  const odinPaiDeTodos = document.querySelector('.cart__items');
  const thor = odinPaiDeTodos.childNodes;

  const arrei = [];
  for (let i = 0; i < thor.length; i += 1) {
    arrei.push(thor[i].innerText);
  }
  localStorage.setItem('listCarsKeyNew', JSON.stringify(arrei));
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
