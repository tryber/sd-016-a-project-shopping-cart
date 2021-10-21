const fetchProducts = (produto) => {
  const resultado = fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${produto}`)
    .then((response) => response.json())
    .then((data) => data)
    .catch((error) => error);
    return resultado;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
