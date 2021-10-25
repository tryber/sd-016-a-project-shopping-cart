const getSavedCartItems = require('../helpers/getSavedCartItems');

Object.defineProperty(window, 'localStorage', {
  value: {
    getItem: jest.fn(),
  },
});

describe('4 - Teste a função getSavedCartItems', () => {
  // implemente seus testes aqui
  it('Verifica se a função "localStorage.getItem" é chamada ao executar a função "getSavedCartItems()"', () => {
    getSavedCartItems();
    expect(localStorage.getItem).toHaveBeenCalled();
  })
  it('Verifica se a função "localStorage.getItem" é chamada com o parâmetro "cartItems" ao executar a função "gatSavedCartItems()"', () => {
    getSavedCartItems();
    expect(localStorage.getItem).toHaveBeenCalledWith('cartItems');
  })
});
