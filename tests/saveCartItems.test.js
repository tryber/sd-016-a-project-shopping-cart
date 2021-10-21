const saveCartItems = require('../helpers/saveCartItems');

Object.defineProperty(window, 'localStorage', {
  value: {
    setItem: jest.fn(),
  },
});

describe('4 - Teste a função saveCartItems', () => {
  it('Testa se a função foi chamada', () => {
    saveCartItems();
    expect(localStorage.setItem).toHaveBeenCalled();
  });

  it('Testa se a função salva os itens', () => {
    const info = '<li>computador<li>'
    saveCartItems(info);
    expect(localStorage.setItem).toHaveBeenCalledWith('cartItems', info);
  });
});
