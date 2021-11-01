const getSavedCartItems = require('../helpers/getSavedCartItems');

Object.defineProperty(window, 'localStorage', {
  value: {
    getItem: jest.fn(),
  },
});

describe('4 - Teste a função getSavedCartItems', () => {
 it('se ao executar getSavedCartItems o localStorage.getItem é chamado', () => {
   getSavedCartItems();
   expect(localStorage.getItem).toHaveBeenCalled();
 });
 it('ao executar getSavedItems o localStorage.getItem é chamado com o cartItems como parâmetro', () => {
   getSavedCartItems();
   expect(localStorage.getItem).toHaveBeenCalledWith('cartItems');
 })
});
