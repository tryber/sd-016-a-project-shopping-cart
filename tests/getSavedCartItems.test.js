const getSavedCartItems = require('../helpers/getSavedCartItems');

Object.defineProperty(window, 'localStorage', {
  value: {
    getItem: jest.fn(),
  },
});

describe('4 - Teste a função getSavedCartItems', () => {
    it('ao executar getSavedCartItems, o método localStorage.getItem é chamado',() => {
      getSavedCartItems();
      expect(localStorage.getItem).toHaveBeenCalled();
    });
    it('ao executar getSavedCartItems , o método localStorage.setItem é chamado com cartItems como parâmetro',() => {
      getSavedCartItems();
      expect(localStorage.getItem).toHaveBeenCalledWith('cartItems');
  })});
  