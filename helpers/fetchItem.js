async function verifiedFetch(url) {
  return fetch(url)
  .then((r) => r.json())
  .catch(() => 'error');
}
const fetchItem = async (id) => {
  const object = await verifiedFetch(`https://api.mercadolibre.com/items/${id}`);
  return object;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
