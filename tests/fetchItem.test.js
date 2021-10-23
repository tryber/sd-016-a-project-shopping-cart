const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

window.fetch = jest.fn(fetchSimulator);

// 1 - Teste se fetchItem é uma função;

// 2 - Execute a função fetchItem com o argumento do item "MLB1615760527" e teste se fetch foi chamada;

// 3 - Teste se, ao chamar a função fetchItem com o argumento do item "MLB1615760527", a função fetch utiliza o endpoint "https://api.mercadolibre.com/items/MLB1615760527";

// 4 - Teste se o retorno da função fetchItem com o argumento do item "MLB1615760527" é uma estrutura de dados igual ao objeto item que já está importado no arquivo.

// 5 - Teste se, ao chamar a função fetchItem sem argumento, retorna um erro com a mensagem: You must provide an url. Dica: Lembre-se de usar o new Error('mensagem esperada aqui') para comparar com o objeto retornado da API.

describe('2 - Teste a função fecthItem', () => {
  it('deve ser uma função', () => {
    expect(typeof fetchItem).toBe('function');
  });

  it('ao chamá-la com o argumento MLB1615760527, testa se fetch foi chamada', () => {
    fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalled();
  });

  it('ao chamá-la com o argumento MLB1615760527, testa se fetch foi chamada com o endpoint correto', () => {
    const endpoint = "https://api.mercadolibre.com/items/MLB1615760527";
    fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalledWith(endpoint);
  });

  it('testa se o retorno da função é um objeto igual a um item', async () => {
    const results = await fetchItem('MLB1615760527');
    expect(results).toEqual(item);
  });

  it('deve retornar um erro', async () => {
    const expectdError = new Error('You must provide an url');
    const result = await fetchItem();
    expect(result).toEqual(expectdError);
  });
});
