class ArraySanitizer {
  constructor(comparator) {
    this.comparator = comparator;
  }

  sanitize(array) {
    const sorted = [...array].sort(this.comparator);
    return sorted.filter((value, index) => index === 0 || value !== sorted[index - 1]);
  }
}

export default ArraySanitizer;
