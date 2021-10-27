const fetchItem = (id) => fetch(`https://api.mercadolibre.com/items/${id}`)
    .then((data) => data.json())
    .then((response) => response)
    .catch((error) => error);

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
