// Tive ajuda dos colegas Fumagalli, Brunão, Yamazaki, Gustavo Ellwanger todos da turma 16A

/* A função saveCartItems deve salvar os itens do carrinho de compras no localStorage, em uma chave denominada cartItems. Todas as adições e remoções devem ser abordadas para que a lista esteja sempre atualizada. */

const getSavedCartItem = (item) => localStorage.setItem('cartItems', item);
 
if (typeof module !== 'undefined') {
  module.exports = getSavedCartItem;
}

// localStorage.setItem("firstname", "Adam") //salva uma entrada com a key = "firstname" e value = "Adam"
// localStorage.setItem("lastname", "Smith") //salva uma entrada com a key = "lastname" e value = "Smith"