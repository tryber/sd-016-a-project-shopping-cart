const fetchProducts = async (product) => {
  const url = `https://api.mercadolibre.com/sites/MLB/search?q=${product}`;
  const dataResult = fetch(url)
    .then((response) => response.json())
    .then((data) => data)
  return dataResult;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
