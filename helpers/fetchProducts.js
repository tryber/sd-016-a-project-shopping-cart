const fetchProducts = (product) => {  
  const URL = `https://api.mercadolibre.com/sites/MLB/search?q=${product}`;
 
  return fetch(URL)
    .then((response) => response.json())
    .catch((error) => error);
  };
  
if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
