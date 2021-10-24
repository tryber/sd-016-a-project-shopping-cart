const fetchProducts = (product) => {
  // seu código aqui
  const fetchMl = fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${product}`)
    .then((result) => result.json())
    .catch((error) => error);

  return fetchMl;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
