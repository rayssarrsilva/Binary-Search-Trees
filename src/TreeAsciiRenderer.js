class TreeAsciiRenderer {
  render(node, prefix = '', isLeft = true, lines = []) {
    if (!node) {
      return lines;
    }

    this.render(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false, lines);
    lines.push(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
    this.render(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true, lines);

    return lines;
  }
}

export default TreeAsciiRenderer;
