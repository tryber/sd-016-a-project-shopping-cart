const mercadoLibreUrl = (querry) => `https://api.mercadolibre.com/sites/MLB/search?q=${querry}`;

const fetchProducts = async (querryUserInfo) => {
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
