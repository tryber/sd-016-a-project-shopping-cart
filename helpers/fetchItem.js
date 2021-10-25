const fetchItem = (itemId) => {
  const url = `https://api.mercadolibre.com/items/${itemId}`;
  const result = fetch(url)
    .then((response) => response.json())
    .then((value) => value)
    .catch((error) => console.log(error));
  return result;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
