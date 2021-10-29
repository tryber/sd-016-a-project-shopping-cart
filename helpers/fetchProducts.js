const fetchProducts = (product) => {
  // seu código aqui
  if (!product) throw new Error('You must provide an url');
  const url = `https://api.mercadolibre.com/sites/MLB/search?q=${product}`;
  const a = fetch(url)
    .then((response) => response.json()).then((data) => data.results).catch((err) => err);
  return a;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
