const fetchItem = () => {
  const addProduct = fetchItem() => {
    const utl = "https://api.mercadolibre.com/items/$ItemID";
    
    fetch(url)
    .then((data) => data.json())
    .then((data) => console.log(data.value));
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
