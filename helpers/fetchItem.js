const fetchItem = (itemID) => {
  // resolvido com a ajuda de Denilson Santuche, Christian Lessa e João Spinelli.
  const url = `https://api.mercadolibre.com/items/${itemID}`;
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
