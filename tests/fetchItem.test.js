const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

window.fetch = jest.fn(fetchSimulator);

describe('2 - Teste a função fecthItem', () => {
  // implemente seus testes aqui
  it('testa se a função fetchItem é uma função', () => {
  expect(typeof fetchItem).toBe('function');
  });
  it('testa se a função fetchItem com o argumento do item "MLB1615760527" foi chamada;', () => {
    fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalled();
    });
  it('testa se a função fetchItem com o argumento "MLB1615760527", utiliza o endpoint correto', () => {
    fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalledWith('https://api.mercadolibre.com/items/MLB1615760527');
  });
  it('testa se o retorno da função fetchItem("MLB1615760527") é igual ao objeto item que já está importado no arquivo.', async () => {
    expect(await fetchItem('MLB1615760527')).toEqual(item);
  });
  it('testa se, ao chamar a função fetchItem(), retorna um erro com a mensagem: You must provide an url', async () => {
    expect(await fetchItem()).toEqual(new Error ('You must provide an url'));
  });
});
