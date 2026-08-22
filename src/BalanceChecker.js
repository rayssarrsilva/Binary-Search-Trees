class BalanceChecker {
  isBalanced(root) {
    return this.checkHeight(root) !== -1;
  }

  checkHeight(node) {
    if (!node) {
      return 0;
    }

    const leftHeight = this.checkHeight(node.left);
    if (leftHeight === -1) {
      return -1;
    }

    const rightHeight = this.checkHeight(node.right);
    if (rightHeight === -1) {
      return -1;
    }

    if (Math.abs(leftHeight - rightHeight) > 1) {
      return -1;
    }

    return Math.max(leftHeight, rightHeight) + 1;
  }
}

export default BalanceChecker;
