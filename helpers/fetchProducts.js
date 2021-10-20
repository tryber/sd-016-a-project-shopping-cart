const fetchProducts = (product) => {
  const url = `https://api.mercadolibre.com/sites/MLB/search?q=${product}`;
  const result = fetch(url)
    .then((response) => response.json())
    .then((data) => data.results)
    .catch((error) => console.log(`Error: ${error}`));
  
  return result;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
