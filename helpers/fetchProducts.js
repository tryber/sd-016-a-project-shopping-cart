const fetchProducts = (comput) => `https://api.mercadolibre.com/sites/MLB/search?q=${comput}`;

const getFetchProducts = async (comput) => {
  const url = fetchProducts(comput);

  const results = await fetch(url);
  const data = await results.json();

  return data;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
