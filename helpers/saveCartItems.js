const saveCartItems = () => {
  // seu código aqui
  // Créditos do código para Laura Fumagalli - Turma 16 - For(ever).
  const getOl = document.querySelector('.cart__items');
  localStorage.setItem('Produto', getOl.innerHTML);
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
