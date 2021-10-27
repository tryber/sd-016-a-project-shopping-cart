const fetchItem = async (query) => {
  // seu código aqui
  const url = `https://api.mercadolibre.com/items/${query}`;
  const result = await fetch(url)
  .then((response) => response.json())
  .then((data) => data)
  .catch((err) => err);
  return result;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
