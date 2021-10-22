const saveCartItems = require('../helpers/saveCartItems');

Object.defineProperty(window, 'localStorage', {
  value: {
    setItem: jest.fn(),
  },
});

describe('4 - Teste a função saveCartItems', () => {
  // implemente seus testes aqui
  it('Verifica se a função "localStorage.setItem" é chamada ao executar a função "saveCartItems("<ol><li>Item</li></ol>")"', () => {
    saveCartItems("<ol><li>Item</li></ol>");
    expect(localStorage.setItem).toHaveBeenCalled();
  })
  it('Verifica se a função "localStorage.setItem" é chamada ao executar a função "saveCartItems("<ol><li>Item</li></ol>")"', () => {
    saveCartItems("<ol><li>Item</li></ol>");
    expect(localStorage.setItem).toHaveBeenCalledWith('cartItems', "<ol><li>Item</li></ol>");
  })
});
