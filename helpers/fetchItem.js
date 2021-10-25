const fetchItem = (itemID) => {
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

// resolvido com ajuda de Leandro Bastos, João Spinelli e Denilson Santuchi. 
