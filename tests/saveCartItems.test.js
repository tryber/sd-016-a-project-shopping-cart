const saveCartItems = require('../helpers/saveCartItems');

Object.defineProperty(window, 'localStorage', {
  value: {
    setItem: jest.fn(),
  },
});

describe('4 - Teste a função saveCartItems', () => {
  saveCartItems('<ol><li>Item</li></ol>');
  it('method is called', () => {
    expect(localStorage.setItem).toHaveBeenCalled();
  });
  it('method is called with arguments', () => {
    expect(localStorage.setItem).toHaveBeenCalledWith('cartItems', '<ol><li>Item</li></ol>');
  });
});
