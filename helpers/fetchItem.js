const fetchItem = (item) => {
  fetch(`https://api.mercadolibre.com/items/${item}`)
    .then((response) => response.json())
    .then((data) => data)
   .catch((error) => error);
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
