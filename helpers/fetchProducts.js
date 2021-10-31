const fetchProducts = (product) => {
  // seu código aqui
  if (!product) throw new Error('You must provide an url');
  const url = fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${product}`)
    .then((promisseResponse) => promisseResponse.json())
    .then((promisseData) => promisseData.results);
  return url;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}