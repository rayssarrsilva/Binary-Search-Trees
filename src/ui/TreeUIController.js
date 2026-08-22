import BinarySearchTree from '../BinarySearchTree.js';
import TreeAsciiRenderer from '../TreeAsciiRenderer.js';
import TreeSummaryBuilder from './TreeSummaryBuilder.js';
import NumberListParser from './NumberListParser.js';

class TreeUIController {
  constructor(elements) {
    this.elements = elements;
    this.numberListParser = new NumberListParser();
    this.treeAsciiRenderer = new TreeAsciiRenderer();
    this.treeSummaryBuilder = new TreeSummaryBuilder();
    this.tree = null;
  }

  init() {
    this.elements.buildInput.addEventListener('change', () => this.handleBuild());
    this.elements.insertButton.addEventListener('click', () => this.handleInsert());
    this.elements.deleteButton.addEventListener('click', () => this.handleDelete());
    this.elements.findButton.addEventListener('click', () => this.handleFind());
    this.elements.rebalanceButton.addEventListener('click', () => this.handleRebalance());
    this.handleBuild();
  }

  handleBuild() {
    const values = this.numberListParser.parse(this.elements.buildInput.value);
    this.tree = values.length > 0 ? new BinarySearchTree(values) : null;
    this.setFindResult('');
    this.render();
  }

  handleInsert() {
    if (!this.ensureTreeExists()) {
      return;
    }

    const values = this.numberListParser.parse(this.elements.insertInput.value);
    values.forEach((value) => this.tree.insert(value));
    this.elements.insertInput.value = '';
    this.render();
  }

  handleDelete() {
    if (!this.ensureTreeExists()) {
      return;
    }

    const values = this.numberListParser.parse(this.elements.deleteInput.value);
    values.forEach((value) => this.tree.deleteItem(value));
    this.elements.deleteInput.value = '';
    this.render();
  }

  handleFind() {
    if (!this.ensureTreeExists()) {
      return;
    }

    const values = this.numberListParser.parse(this.elements.findInput.value);
    if (values.length === 0) {
      this.setFindResult('');
      return;
    }

    const value = values[0];
    const found = this.tree.includes(value);
    const depth = found ? this.tree.depth(value) : undefined;
    this.setFindResult(found ? `${value} found at depth ${depth}` : `${value} not found`);
  }

  handleRebalance() {
    if (!this.ensureTreeExists()) {
      return;
    }

    this.tree.rebalance();
    this.render();
  }

  ensureTreeExists() {
    if (!this.tree) {
      this.setFindResult('Enter numbers above first');
      return false;
    }
    return true;
  }

  setFindResult(message) {
    this.elements.findResult.textContent = message;
  }

  render() {
    this.renderTreeOutput();
    this.renderInformation();
  }

  renderTreeOutput() {
    if (!this.tree || !this.tree.root) {
      this.elements.output.textContent = '(empty tree)';
      return;
    }

    const lines = this.treeAsciiRenderer.render(this.tree.root);
    this.elements.output.textContent = lines.join('\n');
  }

  renderInformation() {
    if (!this.tree) {
      this.setInformation({
        height: '-',
        balanced: '-',
        levelOrder: '-',
        preOrder: '-',
        inOrder: '-',
        postOrder: '-',
      });
      return;
    }

    const summary = this.treeSummaryBuilder.build(this.tree);
    this.setInformation({
      height: summary.height,
      balanced: summary.balanced,
      levelOrder: summary.levelOrder.join(', '),
      preOrder: summary.preOrder.join(', '),
      inOrder: summary.inOrder.join(', '),
      postOrder: summary.postOrder.join(', '),
    });
  }

  setInformation(values) {
    this.elements.height.textContent = values.height;
    this.elements.balanced.textContent = values.balanced;
    this.elements.levelOrder.textContent = values.levelOrder;
    this.elements.preOrder.textContent = values.preOrder;
    this.elements.inOrder.textContent = values.inOrder;
    this.elements.postOrder.textContent = values.postOrder;
  }
}

export default TreeUIController;
