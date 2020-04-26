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
      if (!this.isSulfurasProduct(i)) {
        this.decreaseSellin(i);
      }
      if (this.productHasStandardBehavior(i) && this.hasQuality(i)) {
        this.standardQualityDecrease(i);
      } else {
        if (this.isQualityUnderLimit(i)) {
          this.standardQualityIncrease(i)
          if (this.isBackstageProduct(i)) {
            this.backstageQualityIncrease(i);
          }
        }
      }
      if (this.items[i].sellIn < 0) {
        if (!this.isAgedBrieProduct(i)) {
          if (!this.isBackstageProduct(i)) {
            if (this.hasQuality(i)) {
              if (!this.isSulfurasProduct(i)) {
                this.standardQualityDecrease(i);
              }
            }
          } else {
            this.dropQuality(i);
          }
        } else {
          if (this.isQualityUnderLimit(i)) {
            this.standardQualityIncrease(i);
          }
        }
      }
    }

    return this.items;
  }

  backstageQualityIncrease(i) {
    if (this.items[i].sellIn < 11) {
      if (this.isQualityUnderLimit(i)) {
        this.standardQualityIncrease(i);
      }
    }
    if (this.items[i].sellIn < 6) {
      if (this.isQualityUnderLimit(i)) {
        this.standardQualityIncrease(i);
      }
    }
  }

  productHasStandardBehavior(i) {
    return !this.isSulfurasProduct(i) && !this.isAgedBrieProduct(i) && !this.isBackstageProduct(i);
  }

  isQualityUnderLimit(i) {
    return this.items[i].quality < 50;
  }

  hasQuality(i) {
    return this.items[i].quality > 0;
  }

  decreaseSellin(i) {
    this.items[i].sellIn = this.items[i].sellIn - 1;
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

  standardQualityIncrease(i) {
    this.items[i].quality = this.items[i].quality + 1;
  }

  standardQualityDecrease(i) {
    this.items[i].quality = this.items[i].quality - 1;
  }
}

module.exports = {
  Item,
  Shop
}
