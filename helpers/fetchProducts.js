 const fetchProducts = (product) => {
   const link = `https://api.mercadolibre.com/sites/MLB/search?q=${product}`;
  return fetch(link)
  .then((response) => response.json())
  .catch((error) => error);
 };
if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
