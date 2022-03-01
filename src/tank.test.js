import moveTank from './tank';

const logSpy = jest.spyOn(console, 'log').mockImplementation((str) => str.toLowerCase().split('ё').join('е'));

describe('танк', () => {
  afterEach(() => {
    logSpy.mockClear();
  });

  afterAll(() => {
    logSpy.mockRestore();
  });

  it('двигается на 10 клеток, если нет мин', () => {
    moveTank([false, false, false, false, false, false, false, false, false, false]);
    expect(logSpy).toHaveBeenCalledTimes(10);
    expect(logSpy).toHaveLastReturnedWith('танк переместился на 10');
  });

  it('двигается на 10 клеток, если есть 1 мина', () => {
    moveTank([false, false, false, false, true, false, false, false, false, false]);
    // 10 выводов о перемещении, 1 о повреждении
    expect(logSpy).toHaveBeenCalledTimes(11);
    expect(logSpy).toHaveNthReturnedWith(5, 'танк поврежден');
    expect(logSpy).toHaveLastReturnedWith('танк переместился на 10');
  });

  it('двигается до 2-й мины, затем уничтожается', () => {
    moveTank([false, false, false, false, true, false, true, false, false, false]);
    // 7 выводов о перемещении, 1 о повреждении, 1 об уничтожении
    expect(logSpy).toHaveBeenCalledTimes(9);
    expect(logSpy).toHaveNthReturnedWith(5, 'танк поврежден');
    expect(logSpy).toHaveLastReturnedWith('танк уничтожен');
  });
});
