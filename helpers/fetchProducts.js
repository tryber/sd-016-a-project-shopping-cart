const fetchProducts = (query) => {
  // seu código aqui
  const url = `https://api.mercadolibre.com/sites/MLB/search?q=${query}`;
  const getApi = fetch(url)
  .then((response) => response.json())
  .then((getArray) => getArray.results);
  return getApi;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
