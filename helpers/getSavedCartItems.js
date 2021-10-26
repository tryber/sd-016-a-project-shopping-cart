const getSavedCartItems = () => localStorage.getItem('cartItems');
  // a função getSavedCartItems deve recuperar os itens do carrinho de compras do localStorage quando carregamos a página. Após ter implementado com sucesso as funções saveCartItems e getSavedCartItems, você deve utilizá-las dentro do arquivo script.js.

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
