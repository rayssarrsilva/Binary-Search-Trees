import TraversalStrategy from './TraversalStrategy.js';

class PostOrderTraversal extends TraversalStrategy {
  traverse(root, callback) {
    this.visit(root, callback);
  }

  visit(node, callback) {
    if (!node) {
      return;
    }

    this.visit(node.left, callback);
    this.visit(node.right, callback);
    callback(node.data);
  }
}

export default PostOrderTraversal;
