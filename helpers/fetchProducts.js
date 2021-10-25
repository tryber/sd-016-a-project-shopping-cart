const mercadoLibreUrl = (querry) => `https://api.mercadolibre.com/sites/MLB/search?q=${querry}`;

const fetchProducts = async (querryUserInfo) => {
  if (!querryUserInfo) {
    throw new Error('You must provide an url');
  }
  const url = mercadoLibreUrl(querryUserInfo);
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
