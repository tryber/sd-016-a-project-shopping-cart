const saveCartItems = require('../helpers/saveCartItems');

Object.defineProperty(window, 'localStorage', {
  value: {
    setItem: jest.fn(),
  },
});

describe('4 - Teste a função saveCartItems', () => {
  test('Se localStorage.setItem foi chamado ', () => {
    saveCartItems('Item');
    expect(localStorage.setItem).toHaveBeenCalled();
  });
  test('Se localStorage.setItem o métodolocalStorage.setItem é chamado com 2 parametros ', () => {
    saveCartItems('Item');
    expect(localStorage.setItem).toHaveBeenCalled();
  });
});
