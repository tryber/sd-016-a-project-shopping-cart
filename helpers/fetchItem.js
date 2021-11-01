const fetchItem = (i) =>
  fetch(`https://api.mercadolibre.com/items/${i}`)
  .then((response) => response.json())
  .catch((error) => error);

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}