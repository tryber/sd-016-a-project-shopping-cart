const fetchItem = (ItemID) => fetch(`https://api.mercadolibre.com/items/${ItemID}`)
.then((product) => product.json())
.then((data) => data);
if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
