const fetchItem = (id) => {
  const url = `https://api.mercadolibre.com/items/${id}`;
  const request = fetch(url).then((response) => response.json())
  .then((datas) => datas)
  .catch(() => {
    throw new Error('You must provide an url');
  });

  return request;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
