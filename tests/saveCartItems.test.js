const saveCartItems = require('../helpers/saveCartItems');

Object.defineProperty(window, 'localStorage', {
  value: {
    setItem: jest.fn(),
  },
});

describe('4 - Teste a função saveCartItems', () => {
  it('teste se ao executar a função com o argumento, o método localStorage.setItem é chamado', () => {
    saveCartItems('item');
    expect(localStorage.setItem).toHaveBeenCalled();
  })

  it('teste se ao executar a função com o argumento, o método localStorage.setItem é chamado com dois parâmetros (cartItems e o valor passado para saveCartItems)', () => {
    const param = 'item';
    saveCartItems(param);
    expect(localStorage.setItem).toHaveBeenCalledWith('cartItems', param);
  })
});
