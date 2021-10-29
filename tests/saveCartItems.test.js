const saveCartItems = require('../helpers/saveCartItems');

Object.defineProperty(window, 'localStorage', {
  value: {
    setItem: jest.fn(),
  },
});

describe('4 - Teste a função saveCartItems', () => {
  // implemente seus testes aqui
  it("Teste da função saveCartItems, se ela esta sendo chamanda", () => {
    saveCartItems("<ol><li>Item</li></ol>");
    expect(localStorage.setItem).toHaveBeenCalled();
  });

  it("Teste da função saveCartItems, se ela retornado chave e valor", () => {
    const expectedStorageKey = "cartItems";
    const itemsAddStorage = "<ol><li>Item</li></ol>";

    expect(localStorage.setItem).toHaveBeenCalledWith(
      expectedStorageKey,
      itemsAddStorage
    );
  });
});
