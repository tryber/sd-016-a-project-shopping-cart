const fetchItem = (id) => fetch(`https://api.mercadolibre.com/items/${id}`)
    .then((response) => response.json())
    .catch((error) => error);

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
