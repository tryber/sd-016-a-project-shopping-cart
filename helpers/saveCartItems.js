// feito com a ajuda dos colegas Bruno Teixeira (Brunão), Cristiane Souza (Cris), e Fabiana Lopes (Fabi) 
// da turma 16 tribo A em sala de estudos.
const saveCartItems = (dataCartItems) => {
  localStorage.setItem('cartItems', dataCartItems);
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
