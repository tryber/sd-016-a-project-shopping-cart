const fetchProducts = async (computador) => {
  const url = `https://api.mercadolibre.com/sites/MLB/search?q=${computador}`;
  return fetch(url)
    .then((response) => response.json())
    .then((data) => data)
    .catch((err) => err);
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
