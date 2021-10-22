const saveCartItems = require('../helpers/saveCartItems');

Object.defineProperty(window, 'localStorage', {
  value: {
    setItem: jest.fn(),
  },
});

beforeEach(() => {
  jest.clearAllMocks();
});

describe('4 - Teste a função saveCartItems', () => {
  // implemente seus testes aqui
  it('Testa se ao executar saveCartItems com um argumento, o método localStorage.setItem é chamado', () => {
    expect.assertions(1);
    const argument = '<ol><li>Item</li></ol>';
    saveCartItems(argument);
    expect(localStorage.setItem).toHaveBeenCalled();
  });

  it('Testa se ao executar saveCartItems com um argumento, o método localStorage.setItem é chamado com os argumentos corretos', () => {
    expect.assertions(1);
    const argument = '<ol><li>Item</li></ol>';
    saveCartItems(argument);
    expect(localStorage.setItem).toHaveBeenCalledWith('cartItems', argument);
  });
});
