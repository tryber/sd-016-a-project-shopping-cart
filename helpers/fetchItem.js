const fetchItem = (object) => {
  if (!object) {
    const erro = new Error('You must provide an url');
    return erro.message;
  }
  const url = `https://api.mercadolibre.com/items/${object}`;
  return fetch(url)
    .then((response) => response.json())
    .then((data) => data);
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
