const fetchProducts = (search) => 
  // seu código aqui
  fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${search}`)
   .then((response) => response.json())
   .then((data) => data)
   .catch(() => {
    const newError = 'You must provide an url';
    return newError;
    });

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
