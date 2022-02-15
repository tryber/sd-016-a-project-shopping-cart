const fetchItem = (cartProduct) => {
  const url = `https://api.mercadolibre.com/items/${cartProduct}`;
  
  return fetch(url)
    .then((data) => data.json())
      .catch((error) => error);
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
