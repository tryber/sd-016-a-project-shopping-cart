const fetchProducts = (products) => {
  return fetch (`https://api.mercadolibre.com/sites/MLB/search?q=${products}`)
  .then((data) => data.json())
  .catch((error) => error);
};
//fetchProducts();

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
