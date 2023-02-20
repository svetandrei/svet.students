import reverseString from './reverse-string';

const logSpy = jest.spyOn(console, 'log').mockImplementation((str) => str);

describe('вывод перевёрнутой строки', () => {
  afterEach(() => {
    logSpy.mockClear();
  });

  afterAll(() => {
    logSpy.mockRestore();
  });

  it('для пустой строки выводится также пустая строка', () => {
    reverseString('');
    expect(logSpy).toHaveLastReturnedWith('');
  });

  it('для односимвольной строки выводится такая же строка', () => {
    reverseString('x');
    expect(logSpy).toHaveLastReturnedWith('x');
  });

  it('строка корректно переворачивается', () => {
    reverseString('12345');
    expect(logSpy).toHaveLastReturnedWith('54321');
  });
});
