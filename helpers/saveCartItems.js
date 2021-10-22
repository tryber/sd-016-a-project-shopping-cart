const saveCartItems = (array) => {
  // seu código aqui
  // Créditos do código para Laura Fumagalli - Turma 16 - For(ever).
  localStorage.setItem('cartItems', array);
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
