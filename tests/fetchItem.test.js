const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

window.fetch = jest.fn(fetchSimulator);

describe('2 - Teste a função fecthItem', () => {
  test('testa se fetchItem é uma função', () => {
    expect(typeof fetchItem).toBe('function');
  });
  
  test('testa se fetch foi chamada ao inicializar a fetchItems com o id "MLB1615760527"', () => {
    fetchItem("MLB1615760527");
    expect(fetch).toHaveBeenCalled();
  });

  test('teste se ao chamar a função fetchItem com o argumento do item "MLB1615760527", a função fetch utiliza o endpoint "https://api.mercadolibre.com/items/MLB1615760527"', () => {
    const endPoint = "https://api.mercadolibre.com/items/MLB1615760527";
    fetchItem("MLB1615760527");
    expect(fetch).toHaveBeenCalledWith(endPoint);
  });

  test('testa se o retorno da função fetchItem com o argumento do item "MLB1615760527" é uma estrutura de dados igual ao objeto item que já está importado no arquivo.',async () => {
    const result = await fetchItem("MLB1615760527");
    expect(result).toEqual(item);
  });

  test('testa se ao chamar a função fetchItem sem argumento, retorna um erro com a mensagem: You must provide an url', async () => {
    try {
      await fetchItem();
    } catch(error) {
      expect(error).toEqual(new Error('You must provide an url'));
    }
  })
});
