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
      } else if (this.isConjuredProduct(i)) {
        this.standardSellinDecrease(i)
        this.qualityDecrease(i,2)
      }
    }

    return this.items;
  }

  isConjuredProduct(i) {
    return this.items[i].name == 'Conjured';
  }

  standardBehavior(i) {
    this.standardSellinDecrease(i);
    if (this.hasQuality(i)) {
      if (!this.isSellByDate(i)) {
        this.qualityDecrease(i,1);
      } else {
        this.qualityDecrease(i,2);
      }
    }
  }

  agedProductBehavior(i) {
    this.standardSellinDecrease(i);
    if (!this.isSellByDate(i)) {
      this.qualityIncrease(i,1);
    } else {
      this.qualityIncrease(i,2);
    }
  }

  backstageProductBehavior(i) {
    this.standardSellinDecrease(i);
    if (this.isSellByDate(i)) {
      this.dropQuality(i);
    } else {
      if (this.sellinIsUnder(i, 6)) {
        this.qualityIncrease(i,3);
      } else if (this.sellinIsUnder(i, 11)) {
        this.qualityIncrease(i,2);
      } else {
        this.qualityIncrease(i,1)
      }
    }
  }

  sellinIsUnder(i, quantity) {
    return this.items[i].sellIn < quantity;
  }

  isSellByDate(i) {
    return this.items[i].sellIn < 0;
  }

  isStandardProduct(i) {
    return !this.isConjuredProduct(i) && !this.isSulfurasProduct(i) && !this.isAgedBrieProduct(i) && !this.isBackstageProduct(i);
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
