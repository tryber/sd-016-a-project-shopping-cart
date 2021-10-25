const fetchItem = async (id) => {
  // seu código aqui
  const endpoint = `https://api.mercadolibre.com/items/${id}`;
  try {
    const response = await fetch(endpoint);
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error('You must provide an url');
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
