const fetchItem = (id) => {
  if (!id) {
    throw new Error('You must provide an url');
  }
  const resultado = fetch(`https://api.mercadolibre.com/items/${id}`)
  .then((promessa) => promessa.json());
  return resultado;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
