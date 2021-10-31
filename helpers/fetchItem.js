const fetchItem = async (ItemID) => {
  try {
    const response = await fetch(
      `https://api.mercadolibre.com/items/${ItemID}`,
    );
    const json = await response.json();
    return json;
  } catch (error) {
    return error;
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}