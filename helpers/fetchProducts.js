const fetchProducts = (product) => {
  return fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${product}`)
  .then((data) => data.json())
  .then((value) => value)
  .catch((error) => error)
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
