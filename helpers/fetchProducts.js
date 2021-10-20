const fetchProducts = async (product) => {
  const apiUrl = `https://api.mercadolibre.com/sites/MLB/search?q=${product}`;
  const data = fetch(apiUrl)
    .then((response) => response.json());
  return data;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
