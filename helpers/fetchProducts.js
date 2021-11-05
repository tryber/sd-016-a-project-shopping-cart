const fetchProducts = async (product) => {
  if (!product) {
    const error = new Error('You must provide an url');
    return error.message;
  }
  const response = await fetch(`https://api.mercadolibre.com/items/${product}`);
  const data = await response.json();
  return data;
};
if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
