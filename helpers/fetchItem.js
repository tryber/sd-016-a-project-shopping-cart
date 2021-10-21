const fetchItem = (itemId) => {
  const urlAPI = `https://api.mercadolibre.com/items/${itemId}`;
  return fetch(urlAPI)
  .then((response) => response.json())
  .then((data) => data)
  .catch((error) => error);
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
