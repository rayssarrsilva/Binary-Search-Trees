import TraversalStrategy from './TraversalStrategy.js';

class InOrderTraversal extends TraversalStrategy {
  traverse(root, callback) {
    this.visit(root, callback);
  }

  visit(node, callback) {
    if (!node) {
      return;
    }

    this.visit(node.left, callback);
    callback(node.data);
    this.visit(node.right, callback);
  }
}

export default InOrderTraversal;
