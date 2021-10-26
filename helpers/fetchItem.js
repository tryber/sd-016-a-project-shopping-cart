const fetchItem = (id) => {
  const url = `https://api.mercadolibre.com/items/${id}`;
  // const loading = document.querySelector('.loading');
  // const body = document.getElementsByTagName(body);
  return fetch(url)
    .then((response) => response.json())
    .catch((error) => error);
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
