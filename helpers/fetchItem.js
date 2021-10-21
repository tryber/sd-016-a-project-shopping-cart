const fetchItem = (itemId) => {
  const url = `https://api.mercadolibre.com/items/${itemId}`;

  return fetch(url)
    .then((data) => data.json())
    .catch((error) => error);
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
