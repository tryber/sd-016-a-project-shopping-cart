const fetchItem = (itemID) =>
  fetch(`https://api.mercadolibre.com/items/${itemID}`)
    .then((data) => data.json())
    .then((response) => response)
    .catch((error) => error);

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
