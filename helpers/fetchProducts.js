const fetchProducts = (search) => {
  // seu código aqui
  if (!search) {
    const newError = 'You must provide an url';
    return newError;
  }
  return fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${search}`)
   .then((response) => response.json())
   .catch((error) => error);
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
