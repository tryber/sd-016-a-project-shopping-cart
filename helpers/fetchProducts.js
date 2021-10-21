const fetchProducts = (productName) => {
  // seu código aqui
  if (productName === undefined) {
    throw new Error('You must provide an url');
  }
  const url = `https://api.mercadolibre.com/sites/MLB/search?q=${productName}`;
  const data = fetch(url)
    .then((response) => response.json())
    .catch((error) => error);
  return data;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
