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

  describe.each([
    {initialSellin: 0, initialQuality: 10, expectedSelling: -1, expectedQuality: 8},
    {initialSellin: -1, initialQuality: 10, expectedSelling: -2, expectedQuality: 8}
  ]
    )(
    'Once the sell by date has passed, Quality degrades twice as fast',
    (data) => {
      test(`when initial sellin is ${data.initialSellin}`, () => {
        const gildedRose = new Shop([new Item("foo", data.initialSellin, data.initialQuality)]);

        const items = gildedRose.updateQuality();

        expect(items[0].sellIn).toBe(data.expectedSelling)
        expect(items[0].quality).toBe(data.expectedQuality)
      });
    }
  );
});
