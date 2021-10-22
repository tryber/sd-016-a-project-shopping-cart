const fetchProducts = (product) => 
(fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${product}`) 
// pode ser que seja preciso por return na frente
  .then((response) => response.json())
  .then((data) => (data))
  .catch((error) => error)
  // .then((data) => console.log(data.results))
);

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
