const fetchProducts = (prod) => fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${prod}`)
  .then((response) => response.json());

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
