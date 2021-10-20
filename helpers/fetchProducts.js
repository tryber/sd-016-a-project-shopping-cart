const fetchProducts = async () => {
  const url = 'https://api.mercadolibre.com/sites/MLB/search?q=computador';
  const dataResult = fetch(url)
    .then((response) => response.json())
    .then((data) => data.results)
    .catch(() => new Error('You must provide an url'));
  return dataResult;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
