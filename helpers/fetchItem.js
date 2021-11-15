const fetchItem = async (item) => {
  const API_URL = `https://api.mercadolibre.com/items/${item}`;
  return fetch(API_URL)
  .then((data) => data.json())
  .then((value) => value)
  .catch((error) => error);
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
