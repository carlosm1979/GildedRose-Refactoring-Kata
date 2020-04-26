const {Shop, Item} = require("../src/gilded_rose");

describe("Gilded Rose", function() {
  it("should foo", function() {
    const gildedRose = new Shop([new Item("foo", 0, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toBe("foo");
  });

  it('At the end of each day our system lowers both values for every item', () => {
    const gildedRose = new Shop([new Item("foo", 10, 9)]);

    const items = gildedRose.updateQuality();

    expect(items[0].sellIn).toBe(9)
    expect(items[0].quality).toBe(8)
  });
});
