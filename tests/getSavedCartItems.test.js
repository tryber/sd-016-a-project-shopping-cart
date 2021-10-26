const getSavedCartItems = require('../helpers/getSavedCartItems');

Object.defineProperty(window, 'localStorage', {
  value: {
    getItem: jest.fn(),
  },
});

describe('4 - Teste a função getSavedCartItems', () => {
  it('Test if getSavedCartItems, calls localStorage.getItem', () => {
    getSavedCartItems();
    expect(localStorage.getItem).toHaveBeenCalled();
  }); 
  it('Test if getSavedCartItems, calls localStorage.getItem with "cartItems"', () => {
    getSavedCartItems();
    expect(localStorage.getItem).toHaveBeenCalledWith('cartItems');
  }); 
});
