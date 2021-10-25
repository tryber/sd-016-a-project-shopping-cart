const fetchItem = (itemId) => {
  const url = `https://api.mercadolibre.com/items/${itemId}`;
  return fetch(url)
  .then((data) => data.json())  
  .then((response) => response)
  .catch((error) => error);
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
