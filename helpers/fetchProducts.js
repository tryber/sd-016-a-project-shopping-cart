const fetchProducts = (product) => 
(fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${product}`) 
  .then((response) => response.json())
  .then((data) => (data))
  .catch((error) => error)
);
  
if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
