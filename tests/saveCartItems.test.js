const getSavedCartItems = require('../helpers/getSavedCartItems');
const saveCartItems = require('../helpers/saveCartItems');

Object.defineProperty(window, 'localStorage', {
  value: {
    setItem: jest.fn(),
  },
});

describe('4 - Teste a função saveCartItems', () => {

  it( 'testa se localStorage.setItem é chamado', () => {
    const mockFn = jest.fn( localStorage.setItem );
    localStorage.setItem = mockFn;
    saveCartItems('<ol><li>Item</li></ol>');
    expect(mockFn).toHaveBeenCalled();
  } );

  it( 'testa se localStorage.setItem é chamado com os parâmetros corretos', () => {
    const mockFn = jest.fn( localStorage.setItem );
    localStorage.setItem = mockFn;
    saveCartItems('<ol><li>Item</li></ol>');
    expect(mockFn).toHaveBeenCalledWith('cartItems','<ol><li>Item</li></ol>');
  } );

});

