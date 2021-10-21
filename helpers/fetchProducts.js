const fetchProducts = (product) => {
  const erro = new Error('You must provide an url');
  if (!product) return erro.message;
  const API_URL = `https://api.mercadolibre.com/sites/MLB/search?q=${product}`;
  return fetch(API_URL)
    .then((response) => response.json())
    .then((data) => data)
    .catch((error) => error);
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
