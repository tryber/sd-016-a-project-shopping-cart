const fetchProducts = (search) =>
  fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${search}`)
    .then((data) => data.json())
    .catch((error) => error);
    
if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
