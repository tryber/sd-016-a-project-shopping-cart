const fetchProducts = (arg) => fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${arg}`)
    .then((res) => res.json())
    .catch((err) => err);

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
