const fetchItem = (ItemID) => fetch(`https://api.mercadolibre.com/items/${ItemID}`)
  .then((toCart) => toCart.json())
  .catch((error) => error);

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
