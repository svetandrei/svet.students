let n = -6;
let m = 5;
let count = 10;
let res = [];

for (let i = 0; i < count; i++) {
  res.push(Math.round(Math.random() * (m - n) + n));
}

console.log(res);
