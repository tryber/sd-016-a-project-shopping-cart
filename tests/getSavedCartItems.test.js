const getSavedCartItems = require('../helpers/getSavedCartItems');

Object.defineProperty(window, 'localStorage', {
  value: {
    getItem: jest.fn(),
  },
});

describe('4 - Teste a função getSavedCartItems', () => {
  // implemente seus testes aqui
  it('chama o método localStorage ao ser chamada com o argumento <ol><li>Item</li></ol>', () => {
    getSavedCartItems('<ol><li>Item</li></ol>');
    expect(localStorage.getItem).toHaveBeenCalled();
  });
  it('ao ser executada, com o metodo localStorage.getItem é chamado com o parametro "cartItems"', () => {
    getSavedCartItems('cartItems');
    expect(localStorage.getItem).toHaveBeenCalledWith('cartItems');
  });
});

// npm run test tests/getSavedCartItems.test.js
