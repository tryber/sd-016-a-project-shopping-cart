async function verifiedFetch(url) {
  return fetch(url)
  .then((r) => r.json())
  .catch(() => 'error');
}
const fetchProducts = async (arg) => {  
  const product = await verifiedFetch(`https://api.mercadolibre.com/sites/MLB/search?q=${arg}`);
  return product;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
