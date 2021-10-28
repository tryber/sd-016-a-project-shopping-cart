const saveCartItems = require('../helpers/saveCartItems');

Object.defineProperty(window, 'localStorage', {
  value: {
    setItem: jest.fn(),
  },
});

// Retirado do repositório gitHub: https://github.com/tryber/sd-016-a-project-shopping-cart/blob/joao-spala-shopping-cart/tests/saveCartItems.test.js

describe('4 - Teste a função saveCartItems', () => {
  describe('Ao ser executada com o argumento <ol><li>Item</li></ol>: ', () => {
    saveCartItems('<ol><li>Item</li></ol>');
    it('O método localStorage.setItem é chamado.', () => {
      expect(localStorage.setItem).toHaveBeenCalled();
    });
    it('O método localStorage.setItem é chamado com os argumentos corretos.', () => {
      expect(localStorage.setItem).toHaveBeenCalledWith('cartItems', '<ol><li>Item</li></ol>');
    });
  });
  
});
