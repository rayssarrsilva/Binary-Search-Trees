import TraversalStrategy from './TraversalStrategy.js';

class LevelOrderTraversal extends TraversalStrategy {
  traverse(root, callback) {
    if (!root) {
      return;
    }

    const queue = [root];
    while (queue.length > 0) {
      const current = queue.shift();
      callback(current.data);
      if (current.left) {
        queue.push(current.left);
      }
      if (current.right) {
        queue.push(current.right);
      }
    }
  }
}

export default LevelOrderTraversal;
