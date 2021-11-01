const fetchItem = (ItemID) => fetch(`https://api.mercadolibre.com/items/${ItemID}`)
  .then((data) => data.json())
  .catch((err) => err);

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
