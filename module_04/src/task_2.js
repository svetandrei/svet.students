let str = 'Привет, мир!';
let resStr = '';

for (let i = str.length - 1; i >= 0; i--) {
  resStr += str[i];
}

console.log(resStr);
