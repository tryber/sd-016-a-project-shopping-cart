const fetchProducts = async (produto) => {
  const API_URL = `https://api.mercadolibre.com/sites/MLB/search?q=${produto}`;
  return fetch(API_URL)
      .then((data) => data.json())
      .catch((err) => err);
  };

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
