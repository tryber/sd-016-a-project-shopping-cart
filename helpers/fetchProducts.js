const fetchProducts = (product) => {
  // seu código aqui
  if (!product) throw new Error('You must provide an url');

  const API_URL = `https://api.mercadolibre.com/sites/MLB/search?q=${product}`;

  const products = fetch(API_URL)
    .then((response) => response.json())
    .then((data) => data.results);
    
  return products;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
