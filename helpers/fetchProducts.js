const fetchProducts = async (query) => {
  const loading = document.createElement('p');
  loading.innerHTML = 'carregando...';
  loading.className = 'loading';
  const url = `https://api.mercadolibre.com/sites/MLB/search?q=${query}`;

  // trecho de código retirado do colega Adran Carnavale
  if (url.endsWith('undefined')) {
    return Promise.reject(new Error('You must provide an url'));
  }

  const response = await fetch(url);
  const data = await response.json();
  return data;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
