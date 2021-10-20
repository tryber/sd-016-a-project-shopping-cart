const fetchProducts = async (search) => {
  if (search === undefined) {
    throw new Error('You must provide an url');
  }

  const result = await fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${search}`)
    .then((data) => data.json())
    .catch((error) => error);

  return result;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
