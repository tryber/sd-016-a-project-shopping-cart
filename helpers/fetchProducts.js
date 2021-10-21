const fetchProducts = (product) => {
  const fetchValue = fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${product}`)
    .then((data) => data.json())
    .catch((error) => error);
    return fetchValue;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}

// const fetch = require('node-fetch');

// const fetchProducts = async () => {
//   const url = 'https://api.mercadolibre.com/sites/MLB/search?q=computador';

//   const products = await fetch(url)
//     .then((response) => response.json())
//     .then((results) => results)
//     .catch((error) => error);

//   return products;
// };

// console.log(fetchProducts);

// window.onload = fetchProducts; // tem que ser chamada quando carrega a pagina
// tem que ser chamada no script.js
// acessar o OBJETO retornado por products e acessar o array que tem dentro apenas com o que o requisito pedir
// data.results para acessar o array // so data para acessar o objeto
// talvez um forEach para iterar com array