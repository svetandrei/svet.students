import reverseString from './reverse-string';

const logSpy = jest.spyOn(console, 'log').mockImplementation((str) => str);

describe('reverse string printer', () => {
  afterAll(() => {
    logSpy.mockRestore();
  });

  it('should print empty string for empty string argument', () => {
    reverseString('');
    expect(logSpy).toHaveLastReturnedWith('');
  });

  it('should print same string for a single character string argument', () => {
    reverseString('x');
    expect(logSpy).toHaveLastReturnedWith('x');
  });

  it('should print reversed string', () => {
    reverseString('12345');
    expect(logSpy).toHaveLastReturnedWith('54321');
  });
});
