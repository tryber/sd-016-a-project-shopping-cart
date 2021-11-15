const fetchItem = (item) => {
  fetch(`https://api.mercadolibre.com/items/${item}`)
  .then((data) => data.json);
};

fetchItem('MLB1341706310');

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
