const saveCartItems = require('../helpers/saveCartItems');

Object.defineProperty(window, 'localStorage', {
  value: {
    setItem: jest.fn(),
  },
});

describe('4 - Teste a função saveCartItems', () => {
  it('The method localStorage.setItem is called if the function is passed an argument', () => {
    expect.assertions(1);
    saveCartItems('<ol><li>Item</li></ol>');
    expect(window.localStorage.setItem).toHaveBeenCalled();
  });
  it('The method localStorage.setItem is called with the expected parameters', () => {
    expect.assertions(1);
    const item = '<ol><li>Item</li></ol>';
    saveCartItems(item);

    expect(window.localStorage.setItem).toHaveBeenCalledWith('cartItems', item);
  });
});
