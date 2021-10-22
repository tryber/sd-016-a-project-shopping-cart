const fetchProducts = (product) => {
  return fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${product}`) // pode ser que seja preciso por return na frente
  .then((response) => response.json())
    // .then((data) => console.log(data.results))
    .then((data) => (data.results))
    .catch((error) => error);
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
