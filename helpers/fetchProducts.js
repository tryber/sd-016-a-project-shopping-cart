const fetchProducts = async (product) => {
  try {
    const data = await fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${product}`);
    const value = await data.json();
    return value;
  } catch (error) {
    return error;
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
