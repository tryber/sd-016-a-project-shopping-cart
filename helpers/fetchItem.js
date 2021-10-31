const fetchItem = (id) => {
  const fetchAPI = fetch(`https://api.mercadolibre.com/items/${id}`)
    .then((response) => response.json())
    .catch((error) => error);
  return fetchAPI;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
