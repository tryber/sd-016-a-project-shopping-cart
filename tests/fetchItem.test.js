const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

window.fetch = jest.fn(fetchSimulator);

describe('2 - Teste a função fecthItem', () => {
  test(('Testa se fecthItem é uma função'), () => {
    expect(typeof fetchItem).toBe('function');
  });

  test(('verifica se ao Executar a função fetchItem com o argumento "MLB1615760527", verifica se fetch foi chamada'), () => {
    fetchItem("MLB1615760527");
    expect(fetch).toHaveBeenCalled();
  });

  test(('Testa se, ao chamar a função fetchItem com o argumento "MLB1615760527", a função fetch utiliza o endpoint padrão'), () => {
    const endpoint = 'https://api.mercadolibre.com/items/MLB1615760527';
    fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalledWith(endpoint);
  });

  test(('Testa se o retorno da função fetchItem com o argumento "MLB1615760527" é uma estrutura de dados igual ao objeto item'), async () => {
    const results = await fetchItem('MLB1615760527');
    expect(results).toEqual(item);
  });

  test(('deve retornar um erro'), async () => {
    const expectErro = new Error('You must provide an url');
    const result = await fetchItem();
    expect(result).toEqual(expectErro);
  });

});
