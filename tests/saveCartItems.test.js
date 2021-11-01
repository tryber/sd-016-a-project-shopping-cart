const saveCartItems = require('../helpers/saveCartItems');

Object.defineProperty(window, 'localStorage', {
  value: {
    setItem: jest.fn(),
  },
});

describe('4 - Teste a função saveCartItems', () => {
  it('test if saveCartItems is called when given argument <ol><li>Item</li></ol>', () => {
    saveCartItems('<ol><li>Item</li></ol>');
    expect(localStorage.setItem).toHaveBeenCalled();
  });
  // it('when given argument <ol><li>Item</li></ol>, test if saveCartItems is called with 2 arguments', () => {
  //   saveCartItems('<ol><li>Item</li></ol>');
  //   expect(localStorage.setItem).not.toHaveBeenCalledWith('cartItems', '<ol><li>Item</li></ol>');
  // }); 
});
