const getSavedCartItems = require('../helpers/getSavedCartItems');

Object.defineProperty(window, 'localStorage', {
  value: {
    getItem: jest.fn(),
  },
});

describe('4 - Teste a função getSavedCartItems', () => {  
    describe('Ao ser executada localStorage.getItem e chamado', () => {
      it('O método localStorage.setItem é chamado.', () => {
        getSavedCartItems();
        expect(localStorage.getItem).toHaveBeenCalled();
      });
      it('O método localStorage.getItem é chamado com o parametro cartItems.', () => {
        getSavedCartItems();
        expect(localStorage.getItem).toHaveBeenCalledWith('cartItems');
      });
    });
});
