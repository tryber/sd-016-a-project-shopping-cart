const fetchItem = (productId) => {
  const productUrl = `https://api.mercadolibre.com/items/${productId}`;
  const data = fetch(productUrl)
    .then((response) => response.json());
  return data;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
