const fetchProducts = (url) =>
  fetch(url)
    .then((response) => response.json())
    .then((data) => data.results)
    .catch((err) => console.error(err));

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
