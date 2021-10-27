const getSavedCartItems = require('../helpers/getSavedCartItems');

Object.defineProperty(window, 'localStorage', {
  value: {
    getItem: jest.fn(),
  },
});

describe('4 - Teste a função getSavedCartItems', () => {
  it('When executing the function, the method localStorage.getItem has been called', () => {
    expect.assertions(1);
    getSavedCartItems();
    expect(window.localStorage.getItem).toHaveBeenCalled();
  });
  it('When executing the function, the method localStorage.getItem is called with the parameter cartItems', () => {
    expect.assertions(1);
    getSavedCartItems();
    expect(window.localStorage.getItem).toHaveBeenCalledWith('cartItems');
  });
});
