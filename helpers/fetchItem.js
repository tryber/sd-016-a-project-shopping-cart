const fetchItem = async (id) => {
  return fetch(`https://api.mercadolibre.com/items/${id}`)
    .then(productInfo => productInfo.json())
    .then(product => product)
    .catch(error => error);
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
