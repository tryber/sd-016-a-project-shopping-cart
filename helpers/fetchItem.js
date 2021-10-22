const fetchItem = async (id) => {

  if(id === undefined){
    throw new Error('You must provide an url');
  }

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
