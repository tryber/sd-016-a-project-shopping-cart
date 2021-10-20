const getUrl = (productName) => `https://api.mercadolibre.com/sites/MLB/search?q=${productName}`;

const fetchProducts = async (productName) => {
  // seu código aqui
  const url = getUrl(productName);

  const productSearch = await fetch(url);
  const product = await productSearch.json();

  return product;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}