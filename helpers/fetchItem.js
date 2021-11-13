const fetchItem = (cartProduct) => {
  fetch(`https://api.mercadolibre.com/items/${cartProduct}`)
    .then((data) => data.json())
      .catch((error) => error);
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
