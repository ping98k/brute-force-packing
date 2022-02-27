import Parallel from "paralleljs";

const isCollisionCheck = (rect1, rect2) => {
  if (
    rect1.x < rect2.x + rect2.w &&
    rect1.x + rect1.w > rect2.x &&
    rect1.y < rect2.y + rect2.h &&
    rect1.h + rect1.y > rect2.y
  ) {
    return true;
  } else {
    return false;
  }
};

export const scanPack = (containerW, containerH, boxlist = []) => {
  let placedlist = [
    {
      x: containerW,
      y: 0,
      w: 1,
      h: containerH,
      b: true,
    },
    {
      x: 0,
      y: containerH,
      w: containerW,
      h: 1,
      b: true,
    },
  ];

  for (let b of boxlist) {
    let stop = false;
    let sortedPlacedList = placedlist.sort((a, b) => a.y + a.h - (b.y + b.h));
    for (let y = 0; y < containerH; y++) {
      if (stop) break;
      for (let x = 0; x < containerW; x++) {
        let isCollision = false;
        let loc = { ...b, x, y };
        for (let p of placedlist) {
          isCollision = isCollisionCheck(loc, p);
          if (isCollision) {
            x = p.w + p.x - 1;
            break;
          }
        }
        if (!isCollision) {
          placedlist.push(loc);
          stop = true;
          break;
        }
      }
      if (stop) break;
      let sortedPlacedListFiltered = sortedPlacedList.filter(
        (f) => f.y + f.h > y
      )[0];
      y = sortedPlacedListFiltered.y + sortedPlacedListFiltered.h - 1;
    }
  }
  return placedlist.filter((p) => !p.b);
};

const permutator = (inputArr) => {
  let result = [];

  const permute = (arr, m = []) => {
    if (arr.length === 0) {
      result.push(m);
    } else {
      for (let i = 0; i < arr.length; i++) {
        let curr = arr.slice();
        let next = curr.splice(i, 1);
        permute(curr.slice(), m.concat(next));
      }
    }
  };

  permute(inputArr);

  return result;
};

export const scanPackForce = async (containerW, containerH, boxlist = []) => {
  console.time("permutator");
  let allList = permutator(boxlist);
  console.timeEnd("permutator");
  let allListP = new Parallel(allList, {
    env: {
      containerW,
      containerH,
    },
  });
  console.time("Parallel");
  const allRes = await allListP.map((a) => {
    const isCollisionCheck = (rect1, rect2) => {
      if (
        rect1.x < rect2.x + rect2.w &&
        rect1.x + rect1.w > rect2.x &&
        rect1.y < rect2.y + rect2.h &&
        rect1.h + rect1.y > rect2.y
      ) {
        return true;
      } else {
        return false;
      }
    };
    const scanPack = (containerW, containerH, boxlist = []) => {
      let placedlist = [
        {
          x: containerW,
          y: 0,
          w: 1,
          h: containerH,
          b: true,
        },
        {
          x: 0,
          y: containerH,
          w: containerW,
          h: 1,
          b: true,
        },
      ];

      for (let b of boxlist) {
        let stop = false;
        let sortedPlacedList = placedlist.sort(
          (a, b) => a.y + a.h - (b.y + b.h)
        );
        for (let y = 0; y < containerH; y++) {
          if (stop) break;
          for (let x = 0; x < containerW; x++) {
            let isCollision = false;
            let loc = { ...b, x, y };
            for (let p of placedlist) {
              isCollision = isCollisionCheck(loc, p);
              if (isCollision) {
                x = p.w + p.x - 1;
                break;
              }
            }
            if (!isCollision) {
              placedlist.push(loc);
              stop = true;
              break;
            }
          }
          if (stop) break;
          let sortedPlacedListFiltered = sortedPlacedList.filter(
            (f) => f.y + f.h > y
          )[0];
          y = sortedPlacedListFiltered.y + sortedPlacedListFiltered.h - 1;
        }
      }
      return placedlist.filter((p) => !p.b);
    };
    return scanPack(global.env.containerW, global.env.containerH, a);
  });
  console.timeEnd("Parallel");
  return allRes.sort((a, b) => b.length - a.length)[0];
};
