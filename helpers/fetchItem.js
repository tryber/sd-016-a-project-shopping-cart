const fetchItem = (idItem) => {
  const url = `https://api.mercadolibre.com/items/${idItem}`;
  return fetch(url)
  .then((response) => response.json())
  .then((data) => data)
  .catch((error) => error); 
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
