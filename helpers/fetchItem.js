const fetchItem = (itemID) => {
  const url = fetch(`https://api.mercadolibre.com/items/${itemID}`)
  .then((data) => data.json())
  .then((response) => response)
  .catch((error) => error);

  return url;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };  
}

// resolvido com ajuda de Leandro Bastos, João Spinelli e Denilson Santuchi. 
