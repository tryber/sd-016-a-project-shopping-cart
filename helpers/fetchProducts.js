const fetchProducts = (QUERY) => fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${QUERY}`)
  .then((data) => data.json())
  .catch((err) => err);

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
