const fetchProducts = (produto) => {
  const API_URL = `https://api.mercadolibre.com/sites/MLB/search?q=${produto}`;
  fetch(API_URL, { headers: { Accept: 'application/json' } })
    .then((response) => response.json()
    .then((data) => data.results)
    // .catch((error) => error);
  }

window.onload = () => fetchProducts('computador');

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
