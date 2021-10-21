const fetchProducts = async (product) => {
  const urlAPI = `https://api.mercadolibre.com/sites/MLB/search?q=${product}`;
  const response = await fetch(urlAPI);
  const data = await response.json();
  return data;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}