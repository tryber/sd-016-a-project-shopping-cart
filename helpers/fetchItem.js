const fetchItem = (itemId) => {
  //   código aqui
  const URL = `https://api.mercadolibre.com/items/${itemId}`;

   return fetch(URL)
    .then((response) => console.log(response.json()))
    .catch((error) => error);
  };

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
