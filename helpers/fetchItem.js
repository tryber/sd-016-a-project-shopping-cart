const fetchItem = async (id) => {
  // seu código aqui
  if (!id) throw new Error('You must provide an url');
  const itemId = await fetch(`https://api.mercadolibre.com/items/${id}`);
  const itemIdJson = await itemId.json();
  return itemIdJson;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
