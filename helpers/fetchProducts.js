const fetchProducts = (produtos) => {
  // seu código aqui
  const url = `https://api.mercadolibre.com/sites/MLB/search?q=${produtos}`;
  return fetch(url)
    .then((response) => response.json())
    .catch((error) => error);
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
