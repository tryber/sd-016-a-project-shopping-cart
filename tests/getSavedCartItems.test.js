const getSavedCartItems = require('../helpers/getSavedCartItems');

Object.defineProperty(window, 'localStorage', {
  value: {
    getItem: jest.fn(),
  },
});

describe('4 - Teste a função getSavedCartItems', () => {
  // implemente seus testes aqui
  it('Quando a função getSavedCartItems é executada, o localStorage.getItem é chamado', () => {
    getSavedCartItems()
    expect(localStorage.getItem).toBeCalled();
  });
  it('O método localStorage.getItem é chamado com o parametro cartItem.', () => {
    expect(localStorage.getItem).toHaveBeenCalledWith('cartItem');
  });
});
