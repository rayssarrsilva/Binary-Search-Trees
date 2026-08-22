class TraversalStrategy {
  traverse(root, callback) {
    throw new Error('traverse must be implemented by subclass');
  }
}

export default TraversalStrategy;
