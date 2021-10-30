const getSavedCartItems = require('../helpers/getSavedCartItems');
const saveCartItems = require('../helpers/saveCartItems');

Object.defineProperty(window, 'localStorage', {
  value: {
    getItem: jest.fn(),
  },
});

describe('4 - Teste a função getSavedCartItems', () => {
  test('Testa se o método localStorage.getItem é chamado ao executar getSavedCartItems()', () => {
    getSavedCartItems();
    expect(localStorage.getItem).toHaveBeenCalled();
  })
  test('Testa se o método localStorage.getItem é chamado com o "cartItems" como parâmetro ao executar getSavedCartItems()', () => {
    expect(localStorage.getItem).toHaveBeenCalledWith('cartItems')
  })
});
