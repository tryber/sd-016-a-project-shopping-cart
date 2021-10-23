const fetchProducts = (product) => {
  const urlAPI = `https://api.mercadolibre.com/sites/MLB/search?q=${product}`;
  return fetch(urlAPI)
  .then((response) => response.json())
  .then((data) => data)
  .catch((error) => error);
}; 

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}