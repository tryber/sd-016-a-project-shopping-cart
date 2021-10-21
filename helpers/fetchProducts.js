const fetchProducts = async (arg) => {
  // seu código aqui
  if (typeof arg === undefined) {
    return new Error('You must provide an url');
  }
  const result = fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${arg}`)
    .then((response) => response.json())
    return result;
}

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}