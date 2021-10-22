const fetchItem = (parameter) => {
  // seu código aqui..
  const url = `https://api.mercadolibre.com/items/${parameter}`;
  return fetch(url)
    .then((response) => response.json())
    .then((data) => data);
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
