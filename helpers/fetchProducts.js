// requisito executado com o auxilio do vídeo de Bernando e mentoria de Humberto Castro
const fetchProducts = (product) => (
fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${product}`)
  .then((data) => data.json())
  .catch((error) => error)
);

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
