const fetchProducts = async (query) => {
  const url = `https://api.mercadolibre.com/sites/MLB/search?q=${query}`;
  
  if (!query || query.length === undefined) {
    throw new Error('You must provide an url');
  }  

  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.results;
  } catch (error) {
    throw new Error('Algo de inesperado aconteceu, tente novamente mais tarde!');
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
