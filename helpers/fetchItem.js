const fetchItem = (itemId) => {
  const item = fetch(`https://api.mercadolibre.com/items/${itemId}`)
    .then((response) => response.json())
    .catch((error) => error);
    return item;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
