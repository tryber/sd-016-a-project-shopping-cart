const fetchProducts = (query) => {
  const API_URL = `https://api.mercadolibre.com/sites/MLB/search?q=${query}`;
  return fetch(API_URL)
    .then((response) => response.json())
    .then((data) => data.results)
    .catch((err) => console.error(err));
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
