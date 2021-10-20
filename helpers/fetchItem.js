const fetchItem = (id) => {
  const url = `https://api.mercadolibre.com/items/${id}`;
  const result = fetch(url)
    .then((r) => r.json());

  return result;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
