const getSavedCartItems = require('../helpers/getSavedCartItems');

Object.defineProperty(window, 'localStorage', {
  value: {
    getItem: jest.fn(),
  },
});

describe('4 - Teste a função getSavedCartItems', () => {
  // implemente seus testes aqui
  // fail('Teste vazio');
  it ('testa se ao executar getSavedCartItems, o método localStorage.getItem é chamado', () => {
    getSavedCartItems();
    expect(localStorage.getItem).toHaveBeenCalled();
  });

  it ('testa se ao executar getSavedCartItems, o método localStorage.getItem é chamado com o "cart-items" como parâmetro.', () => {
    expect(localStorage.getItem).toHaveBeenCalledWith('cartItems');
  })
});
