const fetchItem = (id) => {
  // seu código aqui
  if (!id) {
    throw new Error('You must provide an url');
  }
  const url = `https://api.mercadolibre.com/items/${id}`;
  const data = fetch(url)
    .then((response) => response.json())
    .catch((error) => error);
  return data;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
