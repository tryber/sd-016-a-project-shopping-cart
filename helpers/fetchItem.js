const fetchItem = async (argument) => {
  const requestApi = await fetch(`https://api.mercadolibre.com/items/${argument}`)
  .then((res) => res.json())
  .catch(new Error('error in request from API'));
  return requestApi;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
