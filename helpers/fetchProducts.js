const fetchProducts = async (computador) => 
fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${computador}`)
    .then((product) => product.json())
    .then((data) => data)
    .catch((err) => err);

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}