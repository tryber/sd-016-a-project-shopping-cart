const fetchItem = (product) => {
  const productUrl = `https://api.mercadolibre.com/items/${product}`;
  return fetch(productUrl)
    .then((resposta) => resposta.json())
    .then((data) => data);
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
