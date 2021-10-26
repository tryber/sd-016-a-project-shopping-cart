const fetchItem = (idOfProduct) => 
(fetch(`https://api.mercadolibre.com/items/${idOfProduct}`)
  .then((response) => response.json())
  .then((data) => (data))
  .catch((error) => error)
);

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
