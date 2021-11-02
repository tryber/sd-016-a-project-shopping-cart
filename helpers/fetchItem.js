const fetchItem = (id) => {
  if (!id) {
    throw new Error('You must provide an url');
  }
  const promessa = fetch(`https://api.mercadolibre.com/items/${id}`)
  const promessaJson = promessa.then((promessa) => promessa.json())
  return promessaJson;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
