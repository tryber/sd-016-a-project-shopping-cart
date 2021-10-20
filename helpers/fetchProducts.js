const fetchProducts = (search) => {
  // seu código aqui
  const API_URL = `https://api.mercadolibre.com/sites/MLB/search?q=${search}`;

  fetch(API_URL)
    .then(data => data.json())
    .then(object => object.results)
    .catch(error => console.log(error));
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
