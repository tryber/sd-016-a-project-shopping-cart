const fetchItem = (product) => {
  // seu código aqui
  return fetch(`https://api.mercadolibre.com/items/${product}`)
    .then((response) => response.json())
    
};

console.log(fetchItem('MLB1790675058'));

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
