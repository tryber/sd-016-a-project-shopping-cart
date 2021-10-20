const fetchItem = (object) => {
  const url = `https://api.mercadolibre.com/items/${object}`;
  return fetch(url)
    .then((response) => response.json())
    .then((data) => data);
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
