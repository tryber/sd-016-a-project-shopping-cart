const fetchItem = (id) => {
  const url = `https://api.mercadolibre.com/items/${id}`;
  const result = fetch(url)
    .then((response) => response.json())
    .catch((error) => error);
  return result;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
