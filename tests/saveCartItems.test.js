const saveCartItems = require('../helpers/saveCartItems');

Object.defineProperty(window, 'localStorage', {
  value: {
    setItem: jest.fn(),
  },
});

describe('4 - Teste a função saveCartItems', () => {
  
  test('se ao executar com o argumento "<ol><li>Item</li></ol>" localStorage é chamado', () => {
    saveCartItems('<ol><li>Item<li><ol>');
    expect(localStorage.setItem).toHaveBeenCalled()
  });

  test('se ao executar com o argumento "<ol><li>Item</li></ol>" localStorage é chamado', () => {
    saveCartItems('<ol><li>Item<li><ol>');
    expect(localStorage.setItem).toHaveBeenCalledWith('cartItems', '<ol><li>Item<li><ol>')
  });

});
