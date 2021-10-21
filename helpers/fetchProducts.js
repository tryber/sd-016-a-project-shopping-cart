const fetchProducts = async (produt) => {
  if (!produt) return 'You must provide an url';
  try {
    const url = `https://api.mercadolibre.com/sites/MLB/search?q=${produt}`;
    const promisse = await fetch(url);
    const response = await promisse.json();
    // const data = await response.results;
    return response;
} catch (error) {
    return error;
}
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
