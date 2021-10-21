const fetchProducts = (product) => {
  // seu código aqui
  const urlMercadoLivre = `https://api.mercadolibre.com/sites/MLB/search?q=${product}`;
  return fetch(urlMercadoLivre)
    .then((response) => response.json())
    .catch((error) => error);
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
