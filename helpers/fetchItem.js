const fetchItem = (itemId) => {
  const result = fetch(`https://api.mercadolibre.com/items/${itemId}`)
  .then((retorno) => retorno.json())
  .then((data) => data)
  .catch((error) => error);
  return result;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
