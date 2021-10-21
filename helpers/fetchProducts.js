const getUrl = (productName) => `https://api.mercadolibre.com/sites/MLB/search?q=${productName}`;

const fetchProducts = (productName) => {
  // seu código aqui
  if (!productName) {
    throw new Error('You must provide an url');
  }
  const data = fetch(getUrl(productName))
    .then((response) => response.json())
    .catch((error) => error);
  return data;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
