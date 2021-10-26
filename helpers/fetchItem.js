const fetchItem = (itemID) => 
  fetch(`https://api.mercadolibre.com/items/${itemID}`)
    .then((data) => data.json())
    .catch((error) => error);

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
