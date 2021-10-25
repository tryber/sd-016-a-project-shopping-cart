const carregando = document.querySelector('.loading');

const fetchProducts = (product) =>
  fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${product}`)
    .then((data) => {
      carregando.remove();
      return data.json();
    })
    .catch((error) => error);

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
