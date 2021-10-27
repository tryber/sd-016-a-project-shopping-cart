const fetchItem = (itemId) =>
  fetch(`https://api.mercadolibre.com/items/${itemId}`)
    .then((itemData) => itemData.json())
    .catch((error) => error);

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
