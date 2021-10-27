const fetchItem = async (id) => {
  if (!id) return 'You must provide an url';

  const url = `https://api.mercadolibre.com/items/${id}`;
  const promisse = await fetch(url);
  const response = await promisse.json();
  return response;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}