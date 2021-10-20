const fetchProducts = (produtos) => {
  const url = `https://api.mercadolibre.com/sites/MLB/search?q=${produtos}`;
  return fetch(url)
    .then((response) => response.json())
    .then((data) => data.results)
    .catch((error) => { console.error(error); });
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
