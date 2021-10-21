const fetchProducts = (parameter) => {
  const http = `https://api.mercadolibre.com/sites/MLB/search?q=${parameter}`;
  return fetch(http)
    .then((response) => response.json())
    .then((data) => data);
};

if (typeof module !== 'undefined') {  
  module.exports = {
    fetchProducts,
  };
}

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
