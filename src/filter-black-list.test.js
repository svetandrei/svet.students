import filter from './filter-black-list';

describe('фильтр массива строк по чёрному списку', () => {
  it('фильтр работает корректно', () => {
    expect(filter(['1', '2', '3', '4', '5'], ['3', '4']).sort()).toEqual(['1', '2', '5']);
    expect(filter(['1', '2', '3', '4', '5'], ['0', '3', '4']).sort()).toEqual(['1', '2', '5']);
    expect(filter(['1', '2', '3', '4', '5'], ['6', '7', '8']).sort()).toEqual(['1', '2', '3', '4', '5']);
    expect(filter([], ['6', '7', '8']).sort()).toEqual([]);
    expect(filter(['6', '7', '8'], ['6', '7', '8']).sort()).toEqual([]);
    expect(filter(['6', '7', '8'], []).sort()).toEqual(['6', '7', '8']);
  });
});
