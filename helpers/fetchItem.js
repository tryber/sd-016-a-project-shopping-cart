const fetchItem = async (idItem) => {
  if (!idItem) {
    const error = new Error('You must provide an url');
    return error.message;
  }
  const API_URL = `https://api.mercadolibre.com/items/${idItem}`;
   const response = await fetch(API_URL);
   const data = await response.json();
   return data;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
