const fetchProducts = async (argument) => {
  const requestApi = await fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${argument}`)
  .then((res) => res.json())
  .catch(new Error('error in request from API'));
  return requestApi;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
