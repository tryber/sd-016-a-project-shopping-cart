const fetchProducts = (callback, query) => {
  const url = `https://api.mercadolibre.com/sites/MLB/search?q=${query}`;
  callback(url);
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
