const saveCartItems = require('../helpers/saveCartItems');

Object.defineProperty(window, 'localStorage', {
  value: {
    setItem: jest.fn(),
  },
});

describe('4 - Teste a função saveCartItems', () => {
  it('Test if saveCartItems, calls localStorage.setItem', () => {
    const arg = '<ol><li>Item</li></ol>';
    saveCartItems(arg);
    expect(localStorage.setItem).toHaveBeenCalled();
  }); 
  it('Test if saveCartItems, calls localStorage.setItem with "cartItems" and ol arg', () => {
    const arg = '<ol><li>Item</li></ol>';
    saveCartItems(arg);
    expect(localStorage.setItem).toHaveBeenCalledWith('cartItems', arg);
  }); 
});
