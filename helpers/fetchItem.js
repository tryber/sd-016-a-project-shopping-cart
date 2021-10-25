const fetchItem = (id) => {
  const url = `https://api.mercadolibre.com/items/${id}`;
  return fetch(url)
    .then((response) => response.json())
    .then((data) => data)
    .catch((error) => console.error('You must provide an url', error));
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
