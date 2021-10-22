const saveCartItems = require('../helpers/saveCartItems');

Object.defineProperty(window, 'localStorage', {
  value: {
    setItem: jest.fn(),
  },
});

describe('4 - Teste a função saveCartItems', () => {
  test('Verifica se ao executar saveCartItems(<ol><li>Item</li></ol>) o metodo localStorageItem é chamado', async () => {
    await saveCartItems('<ol><li>Item</li></ol>')
    expect(localStorage.setItem).toHaveBeenCalled();
  });

  test('Teste se, ao chamar a função saveCartItems(<ol><li>Item</li></ol>) ,o metodo localStorage.setItem é chamado com dois parametros = (cartItems e o argumento passado', async () => {
    await saveCartItems('<ol><li>Item</li></ol>')
    expect(localStorage.setItem).toHaveBeenCalledWith('cartItems', '<ol><li>Item</li></ol>');
  });
});
