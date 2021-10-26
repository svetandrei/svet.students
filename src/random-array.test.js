/* eslint-disable no-console */
// здесь находится код для автоматического тестирования
// его нельзя изменять!

import printRandomArray from './random-array';

let randomReturnValue = 0;

const logSpy = jest.spyOn(console, 'log').mockImplementation((ar) => `${ar}`);
const randomSpy = jest.spyOn(Math, 'random').mockImplementation(() => randomReturnValue);

describe('random number array printer', () => {
  afterAll(() => {
    logSpy.mockRestore();
    randomSpy.mockRestore();
  });

  it('should print array to the console', () => {
    randomReturnValue = 0;
    printRandomArray(3, 0, 10);
    expect(logSpy).toHaveLastReturnedWith('0,0,0');
  });

  it('should properly determine minimum random value', () => {
    randomReturnValue = 0;
    printRandomArray(1, -10, 10);
    expect(logSpy).toHaveLastReturnedWith('-10');
    printRandomArray(1, 10, 0);
    expect(logSpy).toHaveLastReturnedWith('0');
    printRandomArray(1, 5, 5);
    expect(logSpy).toHaveLastReturnedWith('5');
  });

  it('should properly determine maximum random value', () => {
    randomReturnValue = 1;
    printRandomArray(1, 0, 10);
    expect(logSpy).toHaveLastReturnedWith('10');
    printRandomArray(1, 10, -100);
    expect(logSpy).toHaveLastReturnedWith('10');
    printRandomArray(1, 5, 5);
    expect(logSpy).toHaveLastReturnedWith('5');
  });

  it('should round numbers to the closest whole', () => {
    randomReturnValue = 0.6;
    printRandomArray(1, 3, 4);
    expect(logSpy).toHaveLastReturnedWith('4');

    randomReturnValue = 0.4;
    printRandomArray(1, 3, 2);
    expect(logSpy).toHaveLastReturnedWith('2');
  });
});
