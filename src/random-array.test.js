/* eslint-disable no-console */
// здесь находится код для автоматического тестирования
// его нельзя изменять!

import printRandomArray from './random-array';

let randomReturnValue = 0;

const logSpy = jest.spyOn(console, 'log').mockImplementation((ar) => `${ar}`);
const randomSpy = jest.spyOn(Math, 'random').mockImplementation(() => randomReturnValue);

describe('вывод в косноль массива случайных чисел', () => {
  afterEach(() => {
    logSpy.mockClear();
    randomSpy.mockClear();
  });

  afterAll(() => {
    logSpy.mockRestore();
    randomSpy.mockRestore();
  });

  it('все элементы массива выводится в консоль', () => {
    randomReturnValue = 0;
    printRandomArray(3, 0, 10);
    expect(logSpy).toHaveLastReturnedWith('0,0,0');
  });

  it('минимальное возможное случайное число определяется корректно', () => {
    randomReturnValue = 0;
    printRandomArray(1, -10, 10);
    expect(logSpy).toHaveLastReturnedWith('-10');
    printRandomArray(1, 10, 0);
    expect(logSpy).toHaveLastReturnedWith('0');
    printRandomArray(1, 5, 5);
    expect(logSpy).toHaveLastReturnedWith('5');
  });

  it('максимальное возможное случайное число определяется корректно', () => {
    randomReturnValue = 0.9999999999;
    printRandomArray(1, 0, 10);
    expect(logSpy).toHaveLastReturnedWith('10');
    printRandomArray(1, 10, -100);
    expect(logSpy).toHaveLastReturnedWith('10');
    printRandomArray(1, 5, 5);
    expect(logSpy).toHaveLastReturnedWith('5');
  });

  it('округление дробных чисел работает правильно (до ближайшего целого)', () => {
    randomReturnValue = 0.6;
    printRandomArray(1, 3, 4);
    expect(logSpy).toHaveLastReturnedWith('4');

    randomReturnValue = 0.4;
    printRandomArray(1, 3, 2);
    expect(logSpy).toHaveLastReturnedWith('2');
  });
});
