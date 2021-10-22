const getSavedCartItems = require('../helpers/getSavedCartItems');

Object.defineProperty(window, 'localStorage', {
  value: {
    getItem: jest.fn(),
  },
});

describe('4 - Teste a função getSavedCartItems', () => {
  test('testa se ao executar getSavedCartItems, o método localStorage.getItem é chamado', () => {
    getSavedCartItems();
    expect(localStorage.getItem).toHaveBeenCalled();
  });

  test('testa se ao executar getSavedCartItems, o método localStorage.getItem é chamado com o "cart-items" como parâmetro.', () => {
    expect(localStorage.getItem).toHaveBeenCalledWith('cart-item');
  })
});
