/**
 * Consultar itens API mercado livre ---> "https://api.mercadolibre.com/sites/MLB/search?q=$QUERY"
 * Criar uma lista de produtos com base
 * buscamos no lugar de $QUERY computador ---> acessamos results para pegar um array
 */

const fetchProducts = (product) => 
   fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${product}`)
    .then((response) => response.json())
    // .then((itensJson) => itensJson)
    .catch((error) => error);

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
