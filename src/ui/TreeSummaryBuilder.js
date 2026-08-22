class TreeSummaryBuilder {
  build(tree) {
    return {
      height: tree.root ? tree.height(tree.root.data) : -1,
      balanced: tree.isBalanced(),
      levelOrder: this.collect((callback) => tree.levelOrderForEach(callback)),
      preOrder: this.collect((callback) => tree.preOrderForEach(callback)),
      inOrder: this.collect((callback) => tree.inOrderForEach(callback)),
      postOrder: this.collect((callback) => tree.postOrderForEach(callback)),
    };
  }

  collect(traverse) {
    const values = [];
    traverse((value) => values.push(value));
    return values;
  }
}

export default TreeSummaryBuilder;
