const saveCartItems = require('../helpers/saveCartItems');

Object.defineProperty(window, 'localStorage', {
  value: {
    setItem: jest.fn(),
  },
});

describe('4 - Teste a função saveCartItems', () => {
  it('saveCartItems é uma função', () => {
    expect(typeof saveCartItems === 'function').toBeTruthy();
  });
  it('localStorage.setItem foi chamado', () => {
    saveCartItems('cartItems', '<ol><li>Item</li></ol>');
    expect(localStorage.setItem).toHaveBeenCalled();
  });
});
