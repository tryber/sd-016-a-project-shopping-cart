const fetchProducts = (searched) => (
  fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${searched}`)
    .then((request) => request.json())
    // .then((data) => console.log(data.results))
    // .catch((error) => error)
);

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
