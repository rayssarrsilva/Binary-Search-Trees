import Node from './Node.js';

class TreeBuilder {
  constructor(arraySanitizer) {
    this.arraySanitizer = arraySanitizer;
  }

  build(array) {
    const sanitizedArray = this.arraySanitizer.sanitize(array);
    return this.buildBalancedSubtree(sanitizedArray, 0, sanitizedArray.length - 1);
  }

  buildBalancedSubtree(array, start, end) {
    if (start > end) {
      return null;
    }

    const middle = Math.floor((start + end) / 2);
    const node = new Node(array[middle]);
    node.left = this.buildBalancedSubtree(array, start, middle - 1);
    node.right = this.buildBalancedSubtree(array, middle + 1, end);
    return node;
  }
}

export default TreeBuilder;
