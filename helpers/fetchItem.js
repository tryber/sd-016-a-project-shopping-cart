// const fetch = require('node-fetch');

const fetchItem = (product) => {
  const url = `https://api.mercadolibre.com/items/${product}`;

  const result = fetch(url)
   .then((response) => response.json())
   .catch((error) => error);

  return result;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}

// console.log(fetchItem('MLB1341706310'));
