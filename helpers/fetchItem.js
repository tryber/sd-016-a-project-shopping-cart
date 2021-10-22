const fetchItem = (ItemID) => (
  fetch(`https://api.mercadolibre.com/items/${ItemID}`)
  .then((response) => response.json())
  .catch((error) => error)
);

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
