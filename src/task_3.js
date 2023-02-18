let arrRoads = [false, true, false, false, false, false, false, true, false, false];
let hit = false;

for (let i = 0; i < arrRoads.length; i++) {
  let position = i + 1;

  if (arrRoads[i] === true && hit === false) {
    console.log(`Танк поврежден`);
    hit = true;
  } else if (arrRoads[i] === true && hit === true) {
    console.log(`Танк уничтожен`);
    break;
  } else {
    console.log(`Танк переместился на ${position}`);
  }
}
