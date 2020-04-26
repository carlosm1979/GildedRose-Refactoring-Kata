const {Shop, Item} = require("../src/gilded_rose");

describe("Gilded Rose", function() {
  it("should foo", function() {
    const gildedRose = new Shop([new Item("foo", 0, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toBe("foo");
  });

  it('Sellin degress one point after one day', () => {
    const gildedRose = new Shop([new Item("foo", 10, 0)]);

    const items = gildedRose.updateQuality();

    expect(items[0].sellIn).toBe(9)
  });

  it('Quality degress one point after one day', () => {
    const gildedRose = new Shop([new Item("foo", 1, 9)]);

    const items = gildedRose.updateQuality();

    expect(items[0].quality).toBe(8)
  });


});
