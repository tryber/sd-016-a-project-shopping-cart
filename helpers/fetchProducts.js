const fetchProducts = (product) => {
  // seu código aqui
  const url = `https://api.mercadolibre.com/sites/MLB/search?q=${product}`;
  const path = fetch(url)
    .then((response) => response.json())
    .then((data) => data)
    .catch((error) => error);
    return path;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
