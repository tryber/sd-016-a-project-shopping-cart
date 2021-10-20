const fetchProducts = (callback, item) => {
  callback(item);
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
