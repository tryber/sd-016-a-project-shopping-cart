const fetchProducts = async (parametro) => {
  try {
    const feth = await fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${parametro}`);
    const response = await feth.json();
    return response;
  } catch (e) {
    return 'You must provide an url';
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
