import { hexToRgb, rgbToHex } from './color';

const interpolateNumbers = (num1, num2, n) => {
  return num1 - (num1 - num2) * n;
};

const interpolateRgb = (rgb1, rgb2, n) => {
  const interpolateComp = c =>
    Math.round(interpolateNumbers(rgb1[c], rgb2[c], n));
  return {
    r: interpolateComp('r'),
    g: interpolateComp('g'),
    b: interpolateComp('b')
  };
};

const getInterpolationBounds = (pairs, value) => {
  let prevPair, currentPair, n;
  for (let i = 1; i < pairs.length; i++) {
    currentPair = pairs[i];
    prevPair = pairs[i - 1];

    if (value <= currentPair.value) {
      return {
        lowerBound: prevPair,
        upperBound: currentPair,
        n: (value - prevPair.value) / (currentPair.value - prevPair.value)
      };
    }
  }
};

class ColorScale {
  valueColorPairs = [];

  constructor(valueColorPairs) {
    this.valueColorPairs = valueColorPairs.map(pair => ({
      ...pair,
      rgb: hexToRgb(pair.hex)
    }));
  }

  getColor = value => {
    const { lowerBound, upperBound, n } = getInterpolationBounds(
      this.valueColorPairs,
      value
    );
    return rgbToHex(interpolateRgb(lowerBound.rgb, upperBound.rgb, n));
  };
}

class NumberScale {
  constructor(valuePairs) {
    this.valuePairs = valuePairs;
  }

  getValue = value => {
    const { lowerBound, upperBound, n } = getInterpolationBounds(
      this.valuePairs,
      value
    );
    return interpolateNumbers(lowerBound.number, upperBound.number, n);
  };
}

export const bgColorScale = new ColorScale([
  { hex: '#2B274B', value: 0 },
  { hex: '#2D2F52', value: 3 },
  { hex: '#316591', value: 8 },
  { hex: '#67AACE', value: 16 },
  { hex: '#316591', value: 21 },
  { hex: '#2D2F52', value: 22.5 },
  { hex: '#2B274B', value: 24 }
]);

export const sunColorScale = new ColorScale([
  { hex: '#CF2C5F', value: 0 },
  { hex: '#CF2C5F', value: 6 },
  { hex: '#F3904F', value: 11 },
  { hex: '#F3904F', value: 17 },
  { hex: '#CF2C5F', value: 21 },
  { hex: '#CF2C5F', value: 24 }
]);

export const moonColorScale = new ColorScale([
  { hex: '#E3E7EA', value: 0 },
  { hex: '#E8EBAC', value: 12 },
  { hex: '#E3E7EA', value: 24 }
]);

export const starsOpacityScale = new NumberScale([
  { number: 1, value: 0 },
  { number: 1, value: 7 },
  { number: 0, value: 9 },
  { number: 0, value: 20 },
  { number: 1, value: 22 },
  { number: 1, value: 24 }
]);
