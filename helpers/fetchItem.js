const mercadoLibreItemUrl = (querry) => `https://api.mercadolibre.com/items/${querry}`;

const fetchItem = async (querryUserInfo) => {
  if (!querryUserInfo) {
    throw new Error('You must provide an url');
  }
  const url = mercadoLibreItemUrl(querryUserInfo);
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
