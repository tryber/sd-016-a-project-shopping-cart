const fetchProducts = () => {
  const apiUrl = 'https://api.mercadolibre.com/sites/MLB/search?q=computador';

  return fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => console.log(data.results))
    .catch((err) => console.error(err));
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}

fetchProducts();
