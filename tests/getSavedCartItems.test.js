const getSavedCartItems = require('../helpers/getSavedCartItems');

Object.defineProperty(window, 'localStorage', {
  value: {
    getItem: jest.fn(),
  },
});

describe('4 - Teste a função getSavedCartItems', () => {
  // implemente seus testes aqui
  it('ao chamá-la com o argumento getSavedCartItems, testa se retorna localStorage', () => {
    getSavedCartItems('<ol><li>Item</li></ol>');
    expect(localStorage.getItem).toHaveBeenCalled();
});
it('ao chamá-la com o argumento getSavedCartItems, testa se localStorage foi chamada com o argumento cartItems', () => {
  getSavedCartItems('CartItems');
  expect(localStorage.getItem).toHaveBeenCalledWith('cartItems');
  });
});
