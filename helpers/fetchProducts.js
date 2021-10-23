// Agradecimento especial ao Bernardo Salgueiro (Instrutor - T16) por ter feito um video ajudando a desenrolar o requisito 1.
const fetchProducts = (product) => {
  // seu código aqui
  return fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${product}`)
    .then((response) => response.json())
    .catch((error) => error);
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
