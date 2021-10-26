//import fetch from 'node-fetch'

const fetchProducts = async (query) => {
  //const fetch = require('node-fetch')
  // seu código aqui
  const url = 'https://api.mercadolibre.com/sites/MLB/search?q='+`${query}`;
  const result = await fetch(url)
  .then((response) => response.json())
  .then((data) => data.results)
  .catch((err) => err);
  //console.log(result);
  return result;

};

//console.log("agkjdhfgkjhdfhg"+ fetchProducts('computador'))

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
