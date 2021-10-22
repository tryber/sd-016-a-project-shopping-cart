const fetchProducts = (QUERY) => {
  const url = `https://api.mercadolibre.com/sites/MLB/search?q=${QUERY}`;
  return fetch(url)
  .then((response) => response.json())
  .then((data) => data)
  .catch((err) => err);
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
