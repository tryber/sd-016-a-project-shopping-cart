const fetchProducts = (products) => {
  const urlApi = `https://api.mercadolibre.com/sites/MLB/search?q=${products}`;
  return fetch(urlApi)
    .then((data) => data.json())
    .catch((error) => error);
};

  if (typeof module !== 'undefined') {
    module.exports = {
      fetchProducts,
    };
  }
