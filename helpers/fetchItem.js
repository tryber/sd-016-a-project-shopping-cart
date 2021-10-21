const fetchItem = (itemId) => {
  // seu código aqui
  if (!itemId) throw new Error('You must provide an url');
  
  const API_URL = `https://api.mercadolibre.com/items/${itemId}`;

  const product = fetch(API_URL)
    .then((response) => response.json())
    .then((data) => data);

  return product;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
