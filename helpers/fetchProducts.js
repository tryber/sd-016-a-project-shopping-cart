const fetchProducts = (product) => {
  // seu código aqui
  return fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${product}`)
    .then((result) => result.json())
    .catch((error) => error);
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
