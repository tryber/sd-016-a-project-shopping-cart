const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

window.fetch = jest.fn(fetchSimulator);

describe('2 - Teste a função fecthItem', () => {
  it('Verifica se fetchItem é uma função', () => {
    expect(typeof fetchItem).toBe('function')
  });
  it('Ao executar a função com o argumento "MLB1615760527" verifica se fetch foi chamada', () => {
    fetchItem("MLB1615760527");
    expect(fetch).toHaveBeenCalled();
  });
  it('Teste se, ao chamar a função fetchItem com o argumento do item "MLB1615760527", a função fetch utiliza o endpoint https://api.mercadolibre.com/items/MLB1615760527', () => {
    const endPoint = 'https://api.mercadolibre.com/items/MLB1615760527';
    fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalledWith(endPoint);
  })
  it('Teste se o retorno da função fetchItem com o argumento do item "MLB1615760527" é uma estrutura de dados igual ao objeto item que já está importado no arquivo.', async () => {
    const resultado = await fetchItem('MLB1615760527');
    expect(resultado).toEqual(item);
  });
  it('Testa se retorna um erro', async () => {
    const results = await fetchItem();
    const expectErro = new Error ('You must provide an url');
    expect(results).toEqual(expectErro);
  });
  
});
