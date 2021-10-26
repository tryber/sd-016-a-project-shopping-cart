const fetchItem = async (id) => {
  try {
    const feth = await fetch(`https://api.mercadolibre.com/items/${id}`);
    const response = await feth.json();
    return response;
  } catch (error) {
    return 'You must provide an url';
  }
  }; 
  
if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
