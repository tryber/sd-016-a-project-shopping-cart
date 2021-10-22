const fetchItem = (itemID) => fetch(
  `https://api.mercadolibre.com/items/${itemID}`,
)
.then((response) => response.json())
.then((data) => data)
.catch((error) => error);

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
