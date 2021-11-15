import { tetrisPack } from "./tetrisPack";
describe("tetrisPack", () => {
  it("work correctly easy 1", () => {
    const res = tetrisPack({
      boxHeight: 30,
      boxWidth: 30,
      items: [{ w: 10, h: 10 }],
    });
    expect(res).toMatchObject([{ w: 10, h: 10, x: 0, y: 0 }]);
  });

  xit("work correctly easy 2", () => {
    const res = tetrisPack({
      boxHeight: 30,
      boxWidth: 30,
      items: [
        { w: 10, h: 10 },
        { w: 10, h: 10 },
      ],
    });
    expect(res).toMatchObject([
      { w: 10, h: 10, x: 0, y: 0 },
      { w: 10, h: 10, x: 10, y: 0 },
    ]);
  });

  xit("work correctly hard", () => {
    const res = tetrisPack({
      boxHeight: 30,
      boxWidth: 30,
      items: [
        { w: 10, h: 10 },
        { w: 10, h: 10 },
        { w: 15, h: 20 },
        { w: 5, h: 5 },
        { w: 15, h: 5 },
      ],
    });
    expect(res).toMatchObject([
      { w: 10, h: 10, x: 0, y: 0 },
      { w: 10, h: 10, x: 10, y: 0 },
      { w: 20, h: 20, x: 0, y: 10 },
      { w: 5, h: 5, x: 20, y: 0 },
      { w: 15, h: 5, x: 15, y: 10 },
    ]);
  });
});

