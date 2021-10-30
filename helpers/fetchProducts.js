const fetchProducts = (searched) => (
  fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${searched}`)
    .then((request) => request.json())
    .catch((error) => console.log(error))
);

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
