const fetchProducts = (product) => {
  const productList = fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${product}`)
    .then((response) => response.json())
    .catch((error) => error);
  return productList;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
