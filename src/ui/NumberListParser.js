class NumberListParser {
  parse(rawInput) {
    return rawInput
      .trim()
      .split(/\s+/)
      .filter((token) => token.length > 0)
      .map(Number)
      .filter((value) => Number.isFinite(value));
  }
}

export default NumberListParser;
