const fetchItem = async (id) => (
  fetch(`https://api.mercadolibre.com/items/${id}`)
    .then((request) => request.json())
    .catch((error) => error)
);

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
