const fetchProducts = (query) => fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${query}`)
  .then((response) => response.json())
  .catch((error) => 'You must provide an url');
 
if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
