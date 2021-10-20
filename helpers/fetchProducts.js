const fetchProducts = (pruduto) => {
  // const API_URL = `https://api.mercadolibre.com/sites/MLB/search?q=${pruduto}`;
  // fetch(API_URL, { headers: { Accept: 'application/json' } })

  fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${pruduto}`)
    .then((response) => response.json())
    .then((data) => (data.results));
    .catch((error) => error); 
};

window.onload = () => fetchProducts();

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
