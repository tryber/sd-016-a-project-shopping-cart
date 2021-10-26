const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

window.fetch = jest.fn(fetchSimulator);

describe('2 - Teste a função fecthItem', () => {
  // implemente seus testes aqui
  test('Verifica se fetchItem é uma função', () => {
    expect(typeof fetchItem).toBe('function');
  });
  test('Verifica se ao chamar fetchItem com o parametro ("MLB1615760527") foi chamada', async () => {
    await fetchItem('MLB1615760527')
    expect(fetch).toHaveBeenCalled();
  });
  test('Teste se, ao chamar a função fetchItem com o argumento "MLB1615760527", a função fetch utiliza o endpoint', async () => {
    await fetchItem('MLB1615760527')
    expect(fetch).toHaveBeenCalledWith("https://api.mercadolibre.com/items/MLB1615760527");
  });
  test('Teste se o retorno da função fetchItem com o argumento "MLB1615760527" é uma estrutura de dados igual ao objeto item, que já está importado no arquivo.', async () => {
    expect(await fetchItem('MLB1615760527')).toBe(item);
  });
  test('Teste se, ao chamar a função fetchItem sem argumento, retorna um erro com a mensagem: You must provide an url', async () => {
    expect(await fetchItem()).toBe('You must provide an url');
  });
});
