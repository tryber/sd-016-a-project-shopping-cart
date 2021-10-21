const fetchProducts = async (productName) => {
  const url = `https://api.mercadolibre.com/sites/MLB/search?q=${productName}`;
  return fetch(url)
    .then((response) => response.json())
    .then((data) => data.results)
    .catch((error) => console.log(error));
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
