const fetchItem = (id) => {
  // seu código aqui
  const url = `https://api.mercadolibre.com/items/${id}`;
  return fetch(url)
  .then((data) => data.json())
  .catch((err) => err);
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
