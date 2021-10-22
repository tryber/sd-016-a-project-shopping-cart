const getSavedCartItems = require('../helpers/getSavedCartItems');

Object.defineProperty(window, 'localStorage', {
  value: {
    getItem: jest.fn(),
  },
});

describe('4 - Teste a função getSavedCartItems', () => {
  // implemente seus testes aqui  
  it('Verifica se quando a função getSavedCartItems é executada, o getItem é chamado', () => {
    getSavedCartItems()
    expect(localStorage.getItem).toBeCalled();
  });
  it('Verifica se quando a função getSavedCartItems é executada, o getItem é chamado com cartItems como parâmetro', () => {
    expect(localStorage.getItem).toHaveBeenCalledWith('cartItems');
  });
});
