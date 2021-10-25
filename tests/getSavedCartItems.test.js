const getSavedCartItems = require('../helpers/getSavedCartItems');

Object.defineProperty(window, 'localStorage', {
  value: {
    getItem: jest.fn(),
  },
});

describe('4 - Teste a função getSavedCartItems', () => {
  // implemente seus testes aqui
  it('Testa se localStorage.getItem é chamado em getSavedCartItems', () => {
    getSavedCartItems()
    expect(localStorage.getItem).toHaveBeenCalled()
  });
    it('Testa se localStorage.getItem é chamado com cartItems como parametro', () => {
    getSavedCartItems()
    expect(localStorage.getItem).toHaveBeenCalledWith('cartItems')
  });
});
