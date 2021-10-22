const fetchItem = (itemID) =>
  fetch(`https://api.mercadolibre.com/items/${itemID}`)
    .then((data) => data.json())
    .then((response) => response)
    .catch((error) => error);

fetchItem('MLB1341706310');
if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
