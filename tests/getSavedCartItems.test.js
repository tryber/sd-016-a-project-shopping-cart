const getSavedCartItems = require('../helpers/getSavedCartItems');

Object.defineProperty(window, 'localStorage', {
  value: {
    getItem: jest.fn(),
  },
});

describe('4 - Teste a função getSavedCartItems', () => {
  it('testa se quando chamada getSavedCartItems é chamado tbm o metodo localStorage.getItem()',() =>{
    getSavedCartItems()
    expect(localStorage.getItem).toHaveBeenCalled()
    // implemente seus testes aqui
      }
    )
  
    it('testar se é chamado localStorage com chave igual cartItems',() =>{
      getSavedCartItems()
      expect(localStorage.getItem).toHaveBeenCalledWith('cartItems')
      // implemente seus testes aqui
        }
      )
});
