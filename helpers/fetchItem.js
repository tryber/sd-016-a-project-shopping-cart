const fetchItem = (itemId) => {
  // seu código aqui
  const url = `https://api.mercadolibre.com/items/${itemId}`;
  return fetch(url)
  .then((response) => response.json())
  .catch((err) => err);
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
