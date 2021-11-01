const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

window.fetch = jest.fn(fetchSimulator);

describe('2 - Teste a função fecthItem', () => {
  // implemente seus testes aqui
  // fail('Teste vazio');
  // 1 - Teste se fetchItem é uma função;
  it('fetchItem must be a function', () => {
    expect(typeof fetchItem).toBe('function');
  });
  // 2 - Execute a função fetchItem com o argumento do item "MLB1615760527" e teste se fetch foi chamada;
  it('when fetchItem is called with argument, check if fetch was called', () => {
    fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalled();
  });
  // 3 - Teste se, ao chamar a função fetchItem com o argumento do item "MLB1615760527", a função fetch utiliza o endpoint "https://api.mercadolibre.com/items/MLB1615760527";
  it('message', () => {
    fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalledWith(
      'https://api.mercadolibre.com/items/MLB1615760527',
    );
  });
  // 4 - Teste se o retorno da função fetchItem com o argumento do item "MLB1615760527" é uma estrutura de dados igual ao objeto item que já está importado no arquivo.
  it('message', async () => {
    const expectedData = await fetchItem('MLB1615760527');
    expect(expectedData).toEqual(item);
  });
  // 5 - Teste se, ao chamar a função fetchItem sem argumento, retorna um erro com a mensagem: You must provide an url. Dica: Lembre-se de usar o new Error('mensagem esperada aqui') para comparar com o objeto retornado da API.
  it('message', async () => {
    const fetchData = await fetchItem();
    const expectedError = new Error('You must provide an url');
    expect(fetchData).toEqual(expectedError);
  });
});
