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
        this.standardSellinDecrease(i);
      }
      if (this.productHasStandardBehavior(i) && this.hasQuality(i)) {
        this.standardQualityDecrease(i);
      } else {
        if (this.isBackstageProduct(i)) {
          this.backstageQualityIncrease(i);
        } else {
          this.standardQualityIncrease(i)
        }
      }
      if (this.isSellByDate(i)) {
        if (this.productHasStandardBehavior(i) && this.hasQuality(i)) {
          this.standardQualityDecrease(i);
        }
        if (this.isBackstageProduct(i)) {
          this.dropQuality(i);
        }
        if (this.isAgedBrieProduct(i)){
          this.standardQualityIncrease(i);
        }
      }
    }

    return this.items;
  }

  isSellByDate(i) {
    return this.items[i].sellIn < 0;
  }

  backstageQualityIncrease(i) {
    this.standardQualityIncrease(i)
    if (this.items[i].sellIn < 11) {
      this.standardQualityIncrease(i);
    }
    if (this.items[i].sellIn < 6) {
      this.standardQualityIncrease(i);
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

  standardSellinDecrease(i) {
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
    if (this.isQualityUnderLimit(i)) {
      this.items[i].quality = this.items[i].quality + 1;
    }
  }

  standardQualityDecrease(i) {
    this.items[i].quality = this.items[i].quality - 1;
  }
}

module.exports = {
  Item,
  Shop
}
