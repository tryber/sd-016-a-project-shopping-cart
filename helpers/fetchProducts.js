const fetchProducts = async (productName) => {
  try {
    const url = `https://api.mercadolibre.com/sites/MLB/search?q=${productName}`;
    const product = await fetch(url);
    const response = await product.json();
    return response.results;
  } catch (error) {
    return error;
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
