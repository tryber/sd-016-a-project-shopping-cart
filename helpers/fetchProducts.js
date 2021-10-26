const fetchProducts = (product) => {
  const result = fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${product}`)
  .then((data) => data.json())
.catch((error) => error);
return result;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
