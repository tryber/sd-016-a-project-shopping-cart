const saveCartItems = require('../helpers/saveCartItems');

Object.defineProperty(window, 'localStorage', {
  value: {
    setItem: jest.fn(),
  },
});

describe('4 - Teste a função saveCartItems', () => {

  test('1- check if saveCartItems with "<ol><li>Item</li></ol>" as argument, it will be called the method localStorage.setItem', async () => {

    const argument = '<ol><li>Item</li></ol>';
    saveCartItems(argument);
    expect(localStorage.setItem).toHaveBeenCalled();

  });

  test('2- check if saveCartItems with "<ol><li>Item</li></ol>" as argument, it will be called the method localStorage.setItem with 2 parameters, first "cartItems" and second the argument', async () => {

    const argument = '<ol><li>Item</li></ol>';
    saveCartItems(argument);

    expect(localStorage.setItem).toBeCalledWith('cartItems', JSON.stringify(argument));

  });

});
