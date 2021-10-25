const fetchProducts = (search) => {
  // seu código aqui
  return fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${search}`)
   .then((response) => response.json())
   .catch((error) => error);
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
