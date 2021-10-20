const fetchProducts = (product) => {
  if (!product) {
    const error = new Error('You must provide an url');
    return error.message;
  }

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
