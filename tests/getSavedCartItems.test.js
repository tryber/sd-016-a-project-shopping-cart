const getSavedCartItems = require('../helpers/getSavedCartItems');


Object.defineProperty(window, 'localStorage', {
  value: {
    getItem: jest.fn(),
  },
});

describe('4 - Teste a função getSavedCartItems', () => {

  test('1- check if getSavedCartItems execution, it will be called the method localStorage.getItem', () => {

    getSavedCartItems();
    expect(localStorage.getItem).toHaveBeenCalled();

  });

  test('2- check if getSavedCartItems execution, it will be called the method localStorage.setItem with parameter, cartItems"', () => {

    getSavedCartItems();

    expect(localStorage.getItem).toBeCalledWith('cartItems');

  });

});
