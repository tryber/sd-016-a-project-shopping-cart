const fetchItem = (itemID) => fetch(`https://api.mercadolibre.com/items/${itemID}`)
    .then((res) => res.json())
    .catch((err) => err);

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
