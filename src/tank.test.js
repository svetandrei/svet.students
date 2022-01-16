import moveTank from './tank';

const logSpy = jest.spyOn(console, 'log').mockImplementation((str) => str.toLowerCase().split('ё').join('е'));

describe('движение танка по минному полю', () => {
  afterEach(() => {
    logSpy.mockClear();
  });

  afterAll(() => {
    logSpy.mockRestore();
  });

  it('танк двигается на 10 клеток, если на поле нет мин', () => {
    moveTank([false, false, false, false, false, false, false, false, false, false]);
    expect(logSpy).toHaveBeenCalledTimes(10);
    expect(logSpy).toHaveLastReturnedWith('танк переместился на 10');
  });

  it('танк повреждён, но двигается на 10 клеток, если на пути попадается 1 мина', () => {
    moveTank([false, false, false, false, true, false, false, false, false, false]);
    expect(logSpy).toHaveNthReturnedWith(5, 'танк поврежден');
    expect(logSpy).toHaveLastReturnedWith('танк переместился на 10');
  });

  it('танк двигается, пока не попадёт на 2-ю мину, после чего уничтожается и перестаёт двигаться', () => {
    moveTank([false, false, false, false, true, false, true, false, false, false]);
    expect(logSpy).toHaveBeenCalledTimes(7);
    expect(logSpy).toHaveNthReturnedWith(5, 'танк поврежден');
    expect(logSpy).toHaveLastReturnedWith('танк уничтожен');
  });
});
