const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

window.fetch = jest.fn(fetchSimulator);

describe('2 - Teste a função fecthItem', () => {
  it('Teste se `fetchItem` é uma função', () => {
    expect(typeof fetchItem).toBe('function');
  })
  it('Teste se fetch foi chamada', () => {
    fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalled();
  })
  it('Teste se, ao chamar a função com um argumento , utiliza o endpoint correto', () => {
    fetchItem('MLB1615760527'); 
    // https://stackoverflow.com/questions/40018216/how-to-check-multiple-arguments-on-multiple-calls-for-jest-spies
    expect(fetch).toHaveBeenCalledWith('https://api.mercadolibre.com/items/MLB1615760527');
  })
  it('Teste se o retorno da função com o argumento "MLB1615760527" é correto', async () => {
    const func = await fetchItem('MLB1615760527');
    expect(func).toBe(item);
  })
  it('Teste se, ao chamar a função sem argumento, retorna um erro', async () => {
    const expectError = new Error('You must provide an url');
    const func = await fetchItem();
    expect(func).toEqual(expectError);
  })
});
