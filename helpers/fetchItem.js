const fetchItem = (product) => fetch(`https://api.mercadolibre.com/items/${product}`)
  .then((dados) => dados.json())
  .catch((error) => error);

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
