const fetchProducts = async (query) => {
  const url = `https://api.mercadolibre.com/sites/MLB/search?q=${query}`;
  
  if (!query || query.length === undefined) {
    throw new Error('You must provide an url');
  }  

  try {
    const loading = document.querySelector('.loading');
    loading.style.display = 'block';
    const response = await fetch(url);
    const data = await response.json().then(loading.style.display = 'none');
    
    return data;
  } catch (error) {
    throw new Error('Algo de inesperado aconteceu, tente novamente mais tarde!');
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
