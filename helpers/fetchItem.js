const fetchItem = (parameter) => {
  // seu código aqui..
  const http = `https://api.mercadolibre.com/items/${parameter}`;
  return fetch(http)
    .then((response) => response.json())
    .then((data) => data);
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
