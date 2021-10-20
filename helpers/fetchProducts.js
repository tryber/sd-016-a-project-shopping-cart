const fetchProducts = (computador) => `https://api.mercadolibre.com/sites/MLB/search?q=${computador}`;

const getFetchProducts = async (computador) => {
  const url = fetchProducts(computador);

  const results = await fetch(url);
  const data = await results.json();

  return data;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
