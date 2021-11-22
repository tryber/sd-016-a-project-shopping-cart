const fetchItem = (itemId) => {
  //   código aqui
  const URL = `https://api.mercadolibre.com/items/${itemId}`;

   return fetch(URL)
    .then((response) => response.json())
    .catch((error) => error);
  };

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
