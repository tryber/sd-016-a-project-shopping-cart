 const fetchProducts = (product) => {
  return fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${product}`)
  .then((response) => response.json())
  .catch((error) => error);
 };

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
