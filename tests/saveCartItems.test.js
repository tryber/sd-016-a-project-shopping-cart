const saveCartItems = require('../helpers/saveCartItems');

Object.defineProperty(window, 'localStorage', {
  value: {
    setItem: jest.fn(),
  },
});

describe('4 - Teste a função saveCartItems', () => {
  test('Se, ao executar saveCartItems(<ol><li>Item</li></ol>) o metodo localStorage.setItem é chamado!', () => {
    const funcao = saveCartItems('<ol><li>Item</li></ol>')
    expect(funcao).haveBeenCalled(localStorage.setItem)
  });
});
