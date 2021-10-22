const getSavedCartItems = require('../helpers/getSavedCartItems');

Object.defineProperty(window, 'localStorage', {
  value: {
    getItem: jest.fn(),
  },
});

describe('4 - Teste a função getSavedCartItems', () => {
  // implemente seus testes aqui
  getSavedCartItems()

  it('Verifica se ao executar "getSavedCartItens", o método localStorage.getItem é chamado.', () => {
    expect(localStorage.getItem).toHaveBeenCalled();
  })

  it('Verifica se ao executar função, o metodo "localStorage.getItem" é chamado com o "cartItems" como parâmetro.', () => {
    expect(localStorage.getItem).toHaveBeenCalledWith('cartItems');
  })
});
