/**
 * Calculate cart after discounts
 * @param allSum
 * @param qtyGoods
 * @param coupon
 * @returns {*}
 */
function calculate (allSum, qtyGoods, coupon = toString() || null) {
  let resSum = allSum;
  if (coupon === 'ДАРИМ300') {
    resSum = (allSum > 300) ? allSum - 300 : 0;
  }
  if (qtyGoods >= 10 && resSum > 0) {
    resSum *= 0.95;
  }
  if (resSum > 50000) {
    resSum = 50000 + (resSum - 50000) * 0.8;
  }
  if (coupon === 'СКИДКА15' && resSum >= 20000) {
    resSum *= 0.85;
  }
  return resSum;
}

calculate (50000, 2);

export default calculate;
