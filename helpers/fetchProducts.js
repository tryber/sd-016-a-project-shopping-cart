const fetchProducts = async (productName) => {
  if (productName === undefined) {
    throw new Error('You must provide an url');
  }
  const urlSearch = await fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${productName}`)
    .then((response) => response.json())
    .then((data) => data.results);
  return urlSearch;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
