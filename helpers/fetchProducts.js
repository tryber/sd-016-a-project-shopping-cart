const fetchProducts = () => {
  const url = 'https://api.mercadolibre.com/sites/MLB/search?q=computador';
  const result = fetch(url)
    .then((response) => response.json())
    .then((data) => data.results);
  
  return result;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
