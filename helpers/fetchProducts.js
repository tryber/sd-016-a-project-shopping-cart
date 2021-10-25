const fetchProducts = async (query) => {
  const API_URL = `https://api.mercadolibre.com/sites/MLB/search?q=${query}`;

  return fetch(API_URL)
    .then((data) => data.json())
    .catch((err) => err);
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
