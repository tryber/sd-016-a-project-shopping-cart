const fetchItem = (id) => (
  fetch(`https://api.mercadolibre.com/items/${id}`)
  .then((result) => result.json())
  .catch((error) => error)
);

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
