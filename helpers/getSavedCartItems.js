const getSavedCartItems = () => {
  const odinPaiDeTodos = document.querySelector('.cart__items');

  const getKey = JSON.parse(localStorage.getItem('listCarsKeyNew'));
  for (let i = 0; i < getKey.length; i += 1) {
    const thorNew = document.createElement('li');
    thorNew.innerText = getKey[i];
    odinPaiDeTodos.appendChild(thorNew);
  }
};
if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
