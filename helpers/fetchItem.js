const fetchItem = (itemsId) => {
  const urlApi = `https://api.mercadolibre.com/items/${itemsId}`;
  return fetch(urlApi)
    .then((data) => data.json())
    .catch((error) => error);
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
