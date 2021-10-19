const fetchProducts = (QUERY) => fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${QUERY}`)
  .then((response) => response.json())
  .then((data) => data.results)
  .catch((error) => error);

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
