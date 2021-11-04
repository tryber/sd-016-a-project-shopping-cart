const fetchItem = (cartProduct) => {
  if (!cartProduct) {
    const error = new Error('You must provide an url');
    return error.message;
  }
  
  fetch(`https://api.mercadolibre.com/items/${cartProduct}`)
    .then((data) => data.json())
      .catch((error) => error);
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
