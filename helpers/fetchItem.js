const fetchItem = async (id) => {
  const urlSearch = await fetch(`https://api.mercadolibre.com/items/${id}`)
    .then((response) => response.json());
  return urlSearch;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}