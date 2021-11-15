// export const tetrisPack = ({
//   boxWidth,
//   boxHeight,
//   items = [{ w: 10, h: 10 }],
// }) => {
//   const packed = [];
//   return packed;
// };

export const tetrisPack = ({
  boxWidth,
  boxHeight,
  items = [{ w: 10, h: 10 }],
}) => {
  const packed = [];
  let lowestLine = [{ w: boxWidth, h: 0 }];

  for (const item of items) {
    let availableList = [];
    let xPos = 0;
    // console.log("item", item);
    for (const line of lowestLine) {
      //   console.log("lowestLine", lowestLine);

      if (item.w + xPos > boxWidth) break; // over box
      availableList.push({ x: xPos, y: line.h });

      //   console.log("availableList 1", availableList);
      for (const ava of availableList) {
        if (ava.x + item.w > line.w && line.h > ava.y) {
          // cannot place  remove this pos
          availableList = availableList.filter((a) => a !== ava);
        }
      }
      xPos += line.w;
    }
    availableList.sort((a, b) => a.h - b.h); // sort to find lowest
    // console.log("availableList", availableList);
    if (availableList.length > 0) {
      const lowest = availableList[0];
      const itemPos = { x: lowest.x, y: lowest.y, w: item.w, h: item.h };
      packed.push(itemPos);

      // update lowest
      let xPosLowest = 0;
      let newXPos = -1;
      let skipW = 0;
      for (const line of lowestLine) {
        const index = lowestLine.indexOf(line);
        console.log("line", line);

        if (xPosLowest < itemPos.x) continue; // skip to x
        if (newXPos === -1) newXPos = xPosLowest + itemPos.w;
        console.log("newXPos", newXPos);
        if (lowestLine.length - 1 > index) {
          if (lowestLine[index + 1].w + xPosLowest < newXPos) {
            skipW += line.w;

            continue; // skip to newX
          }
        }

        //add new line pos

        lowestLine.splice(index, 0, { w: newXPos, h: itemPos.y });
        console.log("lowestLine", lowestLine);
        // update next line
        lowestLine[index].w = lowestLine[index].w - skipW - itemPos.w;

        xPosLowest += line.w;
      }
    }
  }

  return packed;
};
