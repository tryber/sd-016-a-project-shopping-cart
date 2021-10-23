const fetchItem = (id) => {
  // seu código aqui
  const url = `https://api.mercadolibre.com/items/${id}`;
  return fetch(url)
    .then((response) => response.json())
    .then((value) => value)
    .catch((error) => error);
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
