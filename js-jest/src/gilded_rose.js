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
      if (this.isStandardProduct(i)) {
        this.standardBehavior(i);
      } else if (this.isBackstageProduct(i)) {
        this.backstageProductBehavior(i);
      } else if (this.isAgedBrieProduct(i)) {
        this.agedProductBehavior(i);
      }
    }

    return this.items;
  }

  standardBehavior(i) {
    this.standardSellinDecrease(i);
    if (this.hasQuality(i)) {
      this.qualityDecrease(i,1);
      if (this.isSellByDate(i)) {
        this.qualityDecrease(i,1);
      }
    }
  }

  agedProductBehavior(i) {
    this.standardSellinDecrease(i);
    this.qualityIncrease(i,1);
    if (this.isSellByDate(i)) {
      this.qualityIncrease(i,1);
    }
  }

  backstageProductBehavior(i) {
    this.standardSellinDecrease(i);
    this.backstageQualityIncrease(i);
    this.backstageQualityDecrease(i);
  }

  backstageQualityDecrease(i) {
    if (this.isSellByDate(i)) {
      this.dropQuality(i);
    }
  }

  isSellByDate(i) {
    return this.items[i].sellIn < 0;
  }

  backstageQualityIncrease(i) {
    this.qualityIncrease(i,1)
    if (this.items[i].sellIn < 11) {
      this.qualityIncrease(i,1);
    }
    if (this.items[i].sellIn < 6) {
      this.qualityIncrease(i,1);
    }
  }

  isStandardProduct(i) {
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

  qualityIncrease(i, quantity) {
    if (this.isQualityUnderLimit(i)) {
      this.items[i].quality = this.items[i].quality + quantity;
    }
  }

  qualityDecrease(i, quantity) {
    this.items[i].quality = this.items[i].quality - quantity;
  }
}

module.exports = {
  Item,
  Shop
}
