const saveCartItems = (listaHTML) => localStorage.setItem('lista', listaHTML);

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
