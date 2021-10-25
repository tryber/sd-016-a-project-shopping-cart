const fetchItem = (item) => {
  const productUrl = `https://api.mercadolibre.com/items/${item}`;
  return fetch(productUrl)
    .then((data) => data.json())
    .then((response) => response)
    .catch((error) => error);
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
