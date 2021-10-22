const saveCartItems = require('../helpers/saveCartItems');

Object.defineProperty(window, 'localStorage', {
  value: {
    setItem: jest.fn(),
  },
});

describe('4 - Teste a função saveCartItems', () => {
  test('Se, ao executar saveCartItems(<ol><li>Item</li></ol>) o metodo localStorage.setItem é chamado!', () => {
     saveCartItems('<ol><li>Item</li></ol>')
    expect(localStorage.setItem).toHaveBeenCalled()
  });
});
