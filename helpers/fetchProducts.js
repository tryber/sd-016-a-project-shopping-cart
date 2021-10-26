//const fetch = require('node-fetch')

const fetchProducts = async () => {
  // seu código aqui
  const url = 'https://api.mercadolibre.com/sites/MLB/search?q=$computador';
  const result = await fetch(url)
  .then((response) => response.json())
  .then((data) => data.results)
  .catch((err) => err);
  //console.log(result);
  return result;

};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
