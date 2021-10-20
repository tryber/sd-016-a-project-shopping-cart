const fetchProducts = (query = 'computador') =>
  fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${query}`)
    .then((response) => response.json())
    .then((search) => search.results);
if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
