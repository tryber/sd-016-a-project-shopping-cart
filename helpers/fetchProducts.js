function fetchProducts($QUERY) {
  // seu código aqui
  return fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${$QUERY}`)
    .then((response) => response.json())
    .then((data) => data.results);
}
if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
