const fetchItem = async (id) => {
  const endpoint = `https://api.mercadolibre.com/items/${id}`;

  // trecho de código retirado do colega Adran Carnavale
  if (endpoint.endsWith('undefined')) {
    return Promise.reject(new Error('You must provide an url'));
  }

  const response = await fetch(endpoint);
  const data = await response.json();

  return data;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
