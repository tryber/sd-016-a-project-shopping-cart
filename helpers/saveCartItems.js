/* A função saveCartItems deve salvar os itens do carrinho de compras no localStorage, em uma chave denominada cartItems. Todas as adições e remoções devem ser abordadas para que a lista esteja sempre atualizada. */

const getSavedCartItems = (item) => {
   // seu código aqui
   localStorage.setItem('cartItems', item);
 };
 
if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}

// localStorage.setItem("firstname", "Adam") //salva uma entrada com a key = "firstname" e value = "Adam"
// localStorage.setItem("lastname", "Smith") //salva uma entrada com a key = "lastname" e value = "Smith"