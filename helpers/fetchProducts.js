const fetchProducts = (q) =>
  fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${q}`)
    .then((res) => res.json());

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
