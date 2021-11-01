const getSavedCartItems = require('../helpers/getSavedCartItems');

Object.defineProperty(window, 'localStorage', {
  value: {
    getItem: jest.fn(),
  },
});

describe('4 - Teste a função getSavedCartItems', () => {
  it('test if when getSavedCartItems is called, method localStorage is called', () => {
    getSavedCartItems();
    expect(localStorage.getItem).not.toHaveBeenCalled();
  });
});
