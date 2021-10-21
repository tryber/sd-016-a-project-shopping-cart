const fetchItem = (itemID) => {
  const url = `https://api.mercadolibre.com/items/${itemID}`;
  const result = fetch(url)
    .then((response) => response.json())
    .catch((error) => error); 
  return result;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
