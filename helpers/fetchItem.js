const fetchItem = (itemId) => {
  const url = `https://api.mercadolibre.com/items/${itemId}`;
  const dataResult = fetch(url)
    .then((response) => response.json())
    .then((data) => data);
  return dataResult;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
