const fetchItem = (itemID) => 
  // seu código aqui
  fetch(`https://api.mercadolibre.com/items/${itemID}`)
   .then((response) => response.json())
   .then((data) => data)
   .catch(() => {
    const newError = 'You must provide an url';
    return newError;
    });
;

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
