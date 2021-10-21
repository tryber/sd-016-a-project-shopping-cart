const fetchProducts = (product) => {
  const fetchValue = fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${product}`)
    .then((data) => data.json())
    .catch((error) => error);
    return fetchValue;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
