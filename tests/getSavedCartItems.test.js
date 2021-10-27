const getSavedCartItems = require('../helpers/getSavedCartItems');

Object.defineProperty(window, 'localStorage', {
  value: {
    getItem: jest.fn(),
  },
});

describe('4 - Teste a função getSavedCartItems', () => {
  // implemente seus testes aqui
  it(`Testa se ao chamar getSavedCartItem a função localStorage.getItem é chamada, 
  e se ela é chamada com o paramêtro cartItems`, () => {
    getSavedCartItems();
    expect(localStorage.getItem).toHaveBeenCalled();
    expect(localStorage.getItem).toHaveBeenCalledWith('cartItems');
  })
});
