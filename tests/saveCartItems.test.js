const saveCartItems = require('../helpers/saveCartItems');

Object.defineProperty(window, 'localStorage', {
  value: {
    setItem: jest.fn(),
  },
});

describe('4 - Teste a função saveCartItems', () => {
  it('foi chamado ', () => {
    saveCartItems('<ol><li>Item</li></ol>');
    expect(localStorage.setItem).toHaveBeenCalled();
  });
  it('a funçao salva os itens', () => {
    const arg = '<ol><li>Item</li></ol>';
    saveCartItems(arg);
    expect(localStorage.setItem).toHaveBeenCalledWith('cartItems', arg);
  })
});
