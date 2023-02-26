/**
 * List emails that not to black list
 * @param arr
 * @param arrBlack
 * @returns {*[]}
 */
function getValidEmails (arr, arrBlack) {
  let arRes = [];
  for (let i in arr) {
    if (!arrBlack.includes(arr[i])) {
      arRes.push(arr[i]);
    }
  }
  return arRes;
}

getValidEmails (['1', '2', '3', '4', '5'],
  ['6', '7', '8']);

export default getValidEmails;
