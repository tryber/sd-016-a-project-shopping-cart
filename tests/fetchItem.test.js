const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

window.fetch = jest.fn(fetchSimulator);

describe('2 - Teste a função fecthItem', () => {
  it('testa se fetchItem é uma funcao', () => {
    expect(typeof fetchItem).toBe('function');
  });
  // Execute a função fetchItem com o argumento do item "MLB1615760527" e teste se fetch foi chamada;
  it('testa se a funcao fechItem com o argumento MLB1615760527 foi chamada', () => {
    fetchItem('MLB1615760527')
    expect(fetch).toHaveBeenCalled();
  });
  // Teste se, ao chamar a função fetchItem com o argumento do item "MLB1615760527", a função fetch utiliza o endpoint "https://api.mercadolibre.com/items/MLB1615760527";
  it('testa se ao chamar a funcao fetchItem com o argumento do item "MLB1615760527", a funcao fetch ultiliza o endpoint correto', () => {
    const endpoint = 'https://api.mercadolibre.com/items/MLB1615760527';
    fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalledWith(endpoint);
  });
  // Teste se o retorno da função fetchItem com o argumento do item "MLB1615760527" é uma estrutura de dados igual ao objeto item que já está importado no arquivo.
  it('testa se o retorno de fetchItem é uma estrutura de dados igual o arquivo importado', async () => {
    const result = await fetchItem('MLB1615760527');
    expect(result).toEqual(item);
  });
  // Teste se, ao chamar a função fetchItem sem argumento, retorna um erro com a mensagem: You must provide an url. Dica: Lembre-se de usar o new Error('mensagem esperada aqui') para comparar com o objeto retornado da API.
  it('testa se ao chamar a funcao fetchItem sem argumento retorna um erro', async () => {
    const expectedError = new Error('You must provide an url');
    const result = await fetchItem();
    expect(result).toEqual(expectedError);
  });
});
