const { removeElementFromArray } = require('../src/utils/arrayUtils');

describe('Sample Test', () => {
  it('it should do nothing if the element is not in the array', () => {
    const result = removeElementFromArray('hola', ['chau']);

    expect(result.length).toBe(1);

    expect(result[0]).toBe('chau');
  });
});
