// feito com a ajuda dos colegas Bruno Teixeira (Brunão), Cristiane Souza (Cris), e Fabiana Lopes (Fabi) 
// da turma 16 tribo A em sala de estudos.
const getSavedCartItems = () => localStorage.getItem('cartItems');

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
