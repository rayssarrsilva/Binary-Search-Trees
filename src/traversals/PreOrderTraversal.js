import TraversalStrategy from './TraversalStrategy.js';

class PreOrderTraversal extends TraversalStrategy {
  traverse(root, callback) {
    this.visit(root, callback);
  }

  visit(node, callback) {
    if (!node) {
      return;
    }

    callback(node.data);
    this.visit(node.left, callback);
    this.visit(node.right, callback);
  }
}

export default PreOrderTraversal;
