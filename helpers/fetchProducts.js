const fetchProducts = (product) => {
  const urlAPI = `https://api.mercadolibre.com/sites/MLB/search?q=${product}`;
  return fetch(urlAPI)
  .then((response) => response.json())
  .then((data) => data)
  .catch((error) => error);
}; 
/* 
const fetchProducts = async (product) => {
  const urlAPI = `https://api.mercadolibre.com/sites/MLB/search?q=${product}`;
  const response = await fetch(urlAPI);
  const data = await response.json();
  return data;
};
 */
if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}