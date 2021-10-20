const fetchItem = (id) => {
  return fetch(`https://api.mercadolibre.com/items/${id}`)
    .then((res) => res.json());
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
