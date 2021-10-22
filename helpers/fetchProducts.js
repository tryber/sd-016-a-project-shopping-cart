const fetchProducts = (product) => 
(fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${product}`) 
  .then((response) => response.json())
  .then((data) => (data))
  .catch((error) => error)
  // .then((data) => console.log(data.results))
  );
  
if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
