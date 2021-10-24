const fetchItem = (itemId) => {
  const result = fetch(`https://api.mercadolibre.com/items/${itemId}`)
    .then((data) => data.json())
    .catch((error) => error);

  return result;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
