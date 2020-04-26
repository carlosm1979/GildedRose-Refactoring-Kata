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

  it('The Quality of an item is never negative', () => {
    const gildedRose = new Shop([new Item("foo", 0, 0)]);

    const items = gildedRose.updateQuality();

    expect(items[0].sellIn).toBe(-1)
    expect(items[0].quality).toBe(0)
  });

  it('“Aged Brie” actually increases in Quality the older it gets', () => {
    const gildedRose = new Shop([new Item("Aged Brie", 1, 1)]);

    const items = gildedRose.updateQuality();

    expect(items[0].sellIn).toBe(0)
    expect(items[0].quality).toBe(2)
  });
  it('“Aged Brie” actually increases double after sell by date passed', () => {
    const gildedRose = new Shop([new Item("Aged Brie", 0, 1)]);

    const items = gildedRose.updateQuality();

    expect(items[0].sellIn).toBe(-1)
    expect(items[0].quality).toBe(3)
  });

  it('The Quality of an item is never more than 50', () => {
    const gildedRose = new Shop([new Item("Aged Brie", 0, 50)]);

    const items = gildedRose.updateQuality();

    expect(items[0].quality).toBe(50)
  });

  it('“Sulfuras”, being a legendary item, never has to be sold or decreases in Quality', () => {
    const gildedRose = new Shop([new Item("Sulfuras, Hand of Ragnaros", 10, 50)]);

    const items = gildedRose.updateQuality();

    expect(items[0].sellIn).toBe(10)
    expect(items[0].quality).toBe(50)
  });

describe.each([
  {initialSellin: 10, initialQuality: 10, expectedSelling: 9, expectedQuality: 12},
  {initialSellin: 6, initialQuality: 10, expectedSelling: 5, expectedQuality: 12},
  {initialSellin: 5, initialQuality: 10, expectedSelling: 4, expectedQuality: 13},
  {initialSellin: 1, initialQuality: 10, expectedSelling: 0, expectedQuality: 13},
  {initialSellin: 0, initialQuality: 10, expectedSelling: -1, expectedQuality: 0}
])(
  '“Backstage passes”, like aged brie, increases in Quality as its SellIn value approaches',
  (data) => {
    test(`returns`, () => {
      const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", data.initialSellin, data.initialQuality)]);

      const items = gildedRose.updateQuality();

      expect(items[0].sellIn).toBe(data.expectedSelling)
      expect(items[0].quality).toBe(data.expectedQuality)
      });
  }
);

});
