const fetchProducts = (query) => {
  const url = `https://api.mercadolibre.com/sites/MLB/search?q=${query}`;
  const result = fetch(url)
    .then((response) => response.json())
    .then((value) => value.results)
    .catch((error) => console.log(error));
  return result;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
