const fetchProducts = async (search) => {

  const result = await fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${search}`)
    .then(data => data.json())
    .catch(error => console.log(error));

    return result;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
