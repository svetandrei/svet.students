import janDays from './jan-days';

const logSpy = jest.spyOn(console, 'log').mockImplementation((str) => str);
const days = ['понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота', 'воскресенье'];

function nextDay(day) {
  const index = days.indexOf(day);
  return days[index + 1] || days[0];
}

function lastDay(day) {
  return days[(days.indexOf(day) - 5 + 7) % 7];
}

describe('january days printer', () => {
  afterEach(() => {
    logSpy.mockClear();
  });

  for (const day of days) {
    it(`should print days from ${day}`, () => {
      janDays(day);
      expect(logSpy).toHaveBeenCalledTimes(31);
      expect(logSpy).toHaveNthReturnedWith(1, `1 января, ${day}`);
      expect(logSpy).toHaveNthReturnedWith(2, `2 января, ${nextDay(day)}`);
      expect(logSpy).toHaveLastReturnedWith(`31 января, ${lastDay(day)}`);
    });
  }
});
