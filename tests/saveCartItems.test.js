const saveCartItems = require('../helpers/saveCartItems');

Object.defineProperty(window, 'localStorage', {
  value: {
    setItem: jest.fn(),
  },
});

describe('4 - Teste a função saveCartItems', () => {
  // implemente seus testes aqui
    it('Testa se localStorage.setItem é chamado em saveCartItems', () => {
    saveCartItems('<ol><li>Item</li></ol>')
    expect(localStorage.setItem).toHaveBeenCalled()
  });
    it('Testa se localStorage.setItem é chamado em saveCartItems, com dois parametros', () => {
    const arg = '<ol><li>Item</li></ol>'
    saveCartItems(arg)
    expect(localStorage.setItem).toHaveBeenCalledWith('cartItems', arg)
  });
});
