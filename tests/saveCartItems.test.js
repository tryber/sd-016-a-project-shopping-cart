const saveCartItems = require('../helpers/saveCartItems');

Object.defineProperty(window, 'localStorage', {
  value: {
    setItem: jest.fn(),
  },
});

describe('4 - Teste a função saveCartItems', () => {
  // implemente seus testes aqui
  it('ao chamá-la com o argumento saveCartItems, testa se retorna localStorage', () => {
    saveCartItems('<ol><li>Item</li></ol>');
    expect(localStorage.setItem).toHaveBeenCalled();
});
it('ao chamá-la com o argumento saveCartItems, testa se localStorage foi chamada com o argumento cartItems ', () => {
  saveCartItems('CartItems');
  expect(localStorage.setItem).toHaveBeenCalledWith('cartItems', '<ol><li>Item</li></ol>');
  });
});
