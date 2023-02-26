import calculate from './cart-total';

const MINUS_300 = 'ДАРИМ300';
const MINUS_15_PERCENT = 'СКИДКА15';

describe('калькулятор суммы корзины', () => {
  it('сумма корзины равна сумме товаров, если нет никаких скидок', () => {
    expect(calculate(10, 9)).toEqual(10);
    expect(calculate(100, 1)).toEqual(100);
    expect(calculate(1000, 5)).toEqual(1000);
    expect(calculate(49999, 3)).toEqual(49999);
  });

  it(`промокод ${MINUS_300} применяется корректно`, () => {
    expect(calculate(1000, 1, MINUS_300)).toEqual(700);
    expect(calculate(820, 9, MINUS_300)).toEqual(520);
    expect(calculate(100, 1, MINUS_300)).toEqual(0);
    expect(calculate(100, 15, MINUS_300)).toEqual(0);
  });

  it('скидка на 5% на 10+ товаров применятеся корректно', () => {
    expect(calculate(100, 10)).toEqual(95);
    expect(calculate(500, 15)).toEqual(475);
    expect(calculate(500, 17, MINUS_300)).toEqual(190);
    expect(calculate(180, 12, MINUS_300)).toEqual(0);
  });

  it('скидка 20% корректно применяется на превышение 50k от суммы корзины', () => {
    expect(calculate(50000, 2)).toEqual(50000);

    // ситуации, когда скидка не должна применяться
    expect(calculate(50100, 1, MINUS_300)).toEqual(49800);
    expect(calculate(52300, 30, MINUS_300)).toEqual(49400);
    expect(calculate(52000, 22)).toEqual(49400);

    // ситуации, когда скидка должна применяться
    expect(calculate(60300, 1, MINUS_300)).toEqual(58000);
    // 70 000 - 5% - 20% на превышение
    expect(calculate(70000, 12)).toEqual(63200);
    // 70 000 - 300 - 5% - 20% на превышение
    expect(calculate(70300, 12, MINUS_300)).toEqual(63200);
  });

  it(`промокод ${MINUS_15_PERCENT} на скидку 15% на корзину с суммой 20k+ применятеся корректно`, () => {
    expect(calculate(19000, 4, MINUS_15_PERCENT)).toEqual(19000);
    expect(calculate(20000, 2, MINUS_15_PERCENT)).toEqual(17000);

    // 21 000 - 5% < 20k, промокод не сработает
    expect(calculate(21000, 12, MINUS_15_PERCENT)).toEqual(19950);
    // 60 000 - 20% на превышение - 15%
    expect(calculate(60000, 1, MINUS_15_PERCENT)).toEqual(49300);
    // 60 000 - 5% - 20% на превышение - 15%
    expect(calculate(60000, 94, MINUS_15_PERCENT)).toEqual(47260);
  });
});
