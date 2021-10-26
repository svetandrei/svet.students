import moveTank from './tank';

const logSpy = jest.spyOn(console, 'log').mockImplementation((str) => str.toLowerCase().split('ё').join('е'));

describe('tank', () => {
  afterEach(() => {
    logSpy.mockClear();
  });

  afterAll(() => {
    logSpy.mockRestore();
  });

  it('moves all the way without mines', () => {
    moveTank([false, false, false, false, false, false, false, false, false, false]);
    expect(logSpy).toHaveBeenCalledTimes(10);
    expect(logSpy).toHaveLastReturnedWith('танк переместился на 10');
  });

  it('moves all the way with one mine', () => {
    moveTank([false, false, false, false, true, false, false, false, false, false]);
    expect(logSpy).toHaveBeenCalledTimes(10);
    expect(logSpy).toHaveNthReturnedWith(5, 'танк поврежден');
    expect(logSpy).toHaveLastReturnedWith('танк переместился на 10');
  });

  it('moves until second mine has been reached', () => {
    moveTank([false, false, false, false, true, false, true, false, false, false]);
    expect(logSpy).toHaveBeenCalledTimes(7);
    expect(logSpy).toHaveNthReturnedWith(5, 'танк поврежден');
    expect(logSpy).toHaveLastReturnedWith('танк уничтожен');
  });
});
