function fetchItem(id) {
  const link = `https://api.mercadolibre.com/items/${id}`;
  return fetch(link)
  .then((data) => data.json())
  .catch((error) => error);
}

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
