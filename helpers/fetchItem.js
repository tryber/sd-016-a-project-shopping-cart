const fetchItem = (ItemID) => {
  const url = `https://api.mercadolibre.com/items/${ItemID}`;
  return fetch(url)
  .then((response) => response.json())
  .catch((error) => error);
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
