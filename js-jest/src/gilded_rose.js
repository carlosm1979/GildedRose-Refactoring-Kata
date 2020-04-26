class Item {
  constructor(name, sellIn, quality){
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

class Shop {
  constructor(items=[]){
    this.items = items;
  }
  updateQuality() {
    for (let i = 0; i < this.items.length; i++) {
      if (!this.isAgedBrieProduct(i) && !this.isBackstageProduct(i)) {
        if (this.items[i].quality > 0) {
          if (!this.isSulfurasProduct(i)) {
            this.decreaseQuality(i);
          }
        }
      } else {
        if (this.items[i].quality < 50) {
          this.increaseQuality(i)
          if (this.isBackstageProduct(i)) {
            if (this.items[i].sellIn < 11) {
              if (this.items[i].quality < 50) {
                this.increaseQuality(i);
              }
            }
            if (this.items[i].sellIn < 6) {
              if (this.items[i].quality < 50) {
                this.increaseQuality(i);
              }
            }
          }
        }
      }
      if (!this.isSulfurasProduct(i)) {
        this.items[i].sellIn = this.items[i].sellIn - 1;
      }
      if (this.items[i].sellIn < 0) {
        if (!this.isAgedBrieProduct(i)) {
          if (!this.isBackstageProduct(i)) {
            if (this.items[i].quality > 0) {
              if (!this.isSulfurasProduct(i)) {
                this.decreaseQuality(i);
              }
            }
          } else {
            this.dropQuality(i);
          }
        } else {
          if (this.items[i].quality < 50) {
            this.increaseQuality(i);
          }
        }
      }
    }

    return this.items;
  }

  dropQuality(i) {
    this.items[i].quality = this.items[i].quality - this.items[i].quality;
  }

  isSulfurasProduct(i) {
    return this.items[i].name == 'Sulfuras, Hand of Ragnaros';
  }

  isBackstageProduct(i) {
    return this.items[i].name == 'Backstage passes to a TAFKAL80ETC concert';
  }

  isAgedBrieProduct(i) {
    return this.items[i].name == 'Aged Brie';
  }

  increaseQuality(i) {
    this.items[i].quality = this.items[i].quality + 1;
  }

  decreaseQuality(i) {
    this.items[i].quality = this.items[i].quality - 1;
  }
}

module.exports = {
  Item,
  Shop
}
