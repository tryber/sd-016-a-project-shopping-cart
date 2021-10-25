const fetchItem = async (id) => {
    const url = fetch(`https://api.mercadolibre.com/items/${id}`);
    return url
    .then((data) => data.json())
    .catch((error) => error);
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
