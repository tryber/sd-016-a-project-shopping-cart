const fetchItem = (item) => {
  // seu código aqui
  const url = `https://api.mercadolibre.com/items/${item}`;
  const result = fetch(url)
    .then((response) => response.json())
    .then((data) => data);

  return result;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
