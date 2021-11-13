const fetchItem = (id) => {
  const url = `https://api.mercadolibre.com/items/${id}`;
  
    return fetch(url)
    .then((data) => data.json())
    .catch((erro) => (erro));
  };

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
