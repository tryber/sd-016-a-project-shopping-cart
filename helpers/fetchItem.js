const fetchItem = (parameter) => {
  // seu código aqui..
  const url = `https://api.mercadolibre.com/items/${parameter}`;
  return fetch(url)
    .then((response) => response.json())
    .then((data) => data);
};
// fetchItem('MLB1615760527');

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
