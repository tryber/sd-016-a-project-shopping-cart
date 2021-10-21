const fetchItem = async (itemID) => {
  if (!itemID) return new Error('You must provide an url');
  const url = `https://api.mercadolibre.com/items/${itemID}`;
  const result = await fetch(url)
    .then((response) => response.json())
    .catch((error) => error); 
  return result;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
