const getSavedCartItems = require('../helpers/getSavedCartItems');

Object.defineProperty(window, 'localStorage', {
  value: {
    getItem: jest.fn(),
  },
});

describe('4 - Teste a função getSavedCartItems', () => {
  // implemente seus testes aqui
  it('4 - Verifica se a função getSavedCartItems é chamada', () => {
    getSavedCartItems();
    expect(localStorage.getItem).toHaveBeenCalled();
  });

  it('4 - Verifica se a função getSavedCartItems é chamada com o parâmetro', () => {
    getSavedCartItems();
    expect(localStorage.getItem).toHaveBeenCalledWith('items');
  });
});
