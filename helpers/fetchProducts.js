const fetchProducts = async (query) => {
  if (!query) { return new Error('You must provide an url'); }

  const url = `https://api.mercadolibre.com/sites/MLB/search?q=$${query}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.log('Something went wrong: ', error);
  }
};

fetchProducts('computador');

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
