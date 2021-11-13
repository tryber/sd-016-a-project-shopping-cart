const getSavedCartItems = require('../helpers/getSavedCartItems');

Object.defineProperty(window, 'localStorage', {
  value: {
    getItem: jest.fn(),
  },
});

describe('4 - Teste a função getSavedCartItems', () => {
  const mockFn = jest.fn( localStorage.getItem );
  localStorage.getItem = mockFn;

  it( 'testa se localStorage.getItem é chamado', () => {
    getSavedCartItems();
    expect(mockFn).toHaveBeenCalled();
  } );

  it( 'testa se localStorage.getItem é chamado com os parâmetros corretos', () => {
    getSavedCartItems();
    expect(mockFn).toHaveBeenCalledWith('cartItems');
  } );
});

