function fetchProducts(QUERY) {
  return fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${QUERY}`)
    .then((data) => data.json())
    .catch((error) => error);
}

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}

// readme muito confuso e pouco claro. passo a passo do projeto muito dificil de acompanhar.