const fetchItem = async (id) => {
  // seu código aqui
  const itemId = await fetch(`https://api.mercadolibre.com/items/${id}`);
  const itemIdJson = await itemId.json();
  console.log(itemIdJson);
};
fetchItem('MLB1341706310');
if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
