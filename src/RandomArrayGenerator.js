class RandomArrayGenerator {
  constructor(maxValue = 100, length = 15) {
    this.maxValue = maxValue;
    this.length = length;
  }

  generate() {
    return Array.from({ length: this.length }, () => Math.floor(Math.random() * this.maxValue));
  }
}

export default RandomArrayGenerator;
