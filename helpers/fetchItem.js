const fetchItem = async (id) => {
  // seu código aqui
  const API_URL = `https://api.mercadolibre.com/items/${id}`;
  return fetch(API_URL)
  .then((data) => data.json())
  .then((value) => value)
  .catch((err) => err);
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
