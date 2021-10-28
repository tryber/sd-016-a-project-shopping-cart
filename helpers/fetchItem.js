const fetchItem = (productId) => {
  // seu código aqui
  if (!productId) throw new Error('You must provide an url');
  const url = `https://api.mercadolibre.com/items/${productId}`;
  const a = fetch(url)
    .then((response) => response.json())
    .then((data) => data)
    .catch((err) => err);
  return a;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
