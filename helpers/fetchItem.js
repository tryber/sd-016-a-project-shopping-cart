const fetchItem = async (ItemID) => fetch(`https://api.mercadolibre.com/items/${ItemID}`)
.then((product) => product.json())
.then((data) => data)
.catch((err) => err);

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
