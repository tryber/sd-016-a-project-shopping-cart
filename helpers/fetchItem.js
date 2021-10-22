const fetchItem = (itemID) => fetch(
  `https://api.mercadolibre.com/items/${itemID}`,
)
.then((response) => response.json())
.catch((error) => error);

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
