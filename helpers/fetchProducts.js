const fetchProducts = (produto) =>
  // try {
  //   const response = await fetch(
  //     `https://api.mercadolibre.com/sites/MLB/search?q=${produto}`,
  //   );
  //   const json = await response.json();
  //   return json;
  // } catch (error) {
  //   return new Error('You must provide an url');
  // }
  fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${produto}`)
    .then((response) => response.json())
    .then((json) => json)
    .catch((error) => error);
if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
