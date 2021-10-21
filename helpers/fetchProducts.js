const fetchProducts = (query) => {
  const url = `https://api.mercadolibre.com/sites/MLB/search?q=${query}`;
  const product = fetch(url)
    .then((response) => response.json())
    .then((value) => value.results)
    .catch((error) => error);
  return product;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
