const fetchProducts = async (callback, query) => {
  const url = `https://api.mercadolibre.com/sites/MLB/search?q=${query}`;
  const response = await callback(url);
  const data = await response.json();

  return data;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
