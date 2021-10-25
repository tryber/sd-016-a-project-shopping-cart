// Menção Honrosa ao Instrutor Caíque Coelho que me lembrou que eu preciso usar o return se eu quiser que a função retorne algo
const fetchProducts = (product) => {
  const url = `https://api.mercadolibre.com/sites/MLB/search?q=${product}`;

 return fetch(url)
  .then((response) => response.json())
  .catch((error) => error);
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
