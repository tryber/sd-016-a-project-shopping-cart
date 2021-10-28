const saveCartItems = require('../helpers/saveCartItems');

Object.defineProperty(window, 'localStorage', {
  value: {
    setItem: jest.fn(),
  },
});

describe('4 - Teste a função saveCartItems', () => {
  // implemente seus testes aqui
  it('ao ser executada, o metodo localStorage é chamado', () => {
    saveCartItems('<ol><li>Item</li></ol>');
    expect(localStorage.setItem).toHaveBeenCalled();
  });
  it("ao ser chamada, com o parametro <ol><li>Item</li></ol>, o metodo localStorage é chamado com dois parametros", () => {
    saveCartItems('cartItems');
    expect(localStorage.setItem).toHaveBeenCalledWith('cartItems','<ol><li>Item</li></ol>' );
  });
});

// npm run test tests/SaveCartItems.test.js
