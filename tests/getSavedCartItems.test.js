const getSavedCartItems = require('../helpers/getSavedCartItems');

Object.defineProperty(window, 'localStorage', {
  value: {
    getItem: jest.fn(),
  },
});

describe('4 - Teste a função getSavedCartItems', () => {
 it('verifica se ao chama getSaveCartItems localStorage.getItem é chamado', ()  => {
   getSavedCartItems();
   expect(localStorage.getItem).toHaveBeenCalled();
 });

it('verifica se ao chama getSaveCartItems localStorage.getItem é chamado com parâmetro -cartItems-', () => {
  getSavedCartItems();
  expect(localStorage.getItem).toHaveBeenCalledWith('cartItems');
});


});
