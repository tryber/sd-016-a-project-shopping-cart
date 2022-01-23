const fetchItem = (id) => {
  // seu código aqui
  const promise = fetch(`https://api.mercadolibre.com/items/${id}`)
    .then((result) => result.json())
    .catch((error) => error);
  
  return promise;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
