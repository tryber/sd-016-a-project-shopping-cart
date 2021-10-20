const fetchProducts = async (query) => {
  const url = `https://api.mercadolibre.com/sites/MLB/search?q=$${query}`;

  // trecho de código retirado do colega Adran Carnavale
  if (url.endsWith('undefined')) {
    return Promise.reject(new Error('You must provide an url'));
  }

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
