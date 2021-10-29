const fetchProducts = (product) => {
  const response = fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${product}`)
    .then((data) => data.json())
    .catch((error) => error);

  return response;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}