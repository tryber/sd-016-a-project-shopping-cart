const saveCartItems = require('../helpers/saveCartItems');

Object.defineProperty(window, 'localStorage', {
  value: {
    setItem: jest.fn(),
  },
});

describe('4 - Teste a função saveCartItems', () => {
  it('Tests if localStorage.setItem is correctly called', async () => {
    expect.assertions(1);
    saveCartItems('<ol><li>Item</li></ol>'); 
    expect(localStorage.setItem).toHaveBeenCalled();
  });
});
