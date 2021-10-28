const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

window.fetch = jest.fn(fetchSimulator);

describe('2 - Teste a função fecthItem', () => {
  it("testar se fechItem é uma função", ()=>{
    expect(typeof fetchItem).toEqual('function')
  });

  it("testar se quando fetchItem é chamada uma fetch tbm é chamada", () => {
    expect(fetchItem('MLB1615760527') instanceof Promise).toEqual(true)
  })

  it("testar se quando chamado fetchItem usa o endpoint especificado", () => {
    expect(fetchItem('MLB1615760527')).toEqual(fetch('https://api.mercadolibre.com/items/MLB1615760527'))
  })

  it("testar se fetchItem é uma estrutura de dados igual ao item", () => {
    expect(typeof fetchItem('MLB1615760527')).toEqual(typeof item);
  })
  
  it("testar se fetchItem sem argumento é retornado um erro", async () => {
    expect(await fetchItem()).toEqual(new Error('You must provide an url'));
  })
 
  // implemente seus testes aqui
});
