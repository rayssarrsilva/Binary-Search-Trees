import Node from './Node.js';
import TreeBuilder from './TreeBuilder.js';
import ArraySanitizer from './ArraySanitizer.js';
import BalanceChecker from './BalanceChecker.js';
import { defaultComparator } from './comparators.js';
import LevelOrderTraversal from './traversals/LevelOrderTraversal.js';
import InOrderTraversal from './traversals/InOrderTraversal.js';
import PreOrderTraversal from './traversals/PreOrderTraversal.js';
import PostOrderTraversal from './traversals/PostOrderTraversal.js';

class BinarySearchTree {
  constructor(array, {
    comparator = defaultComparator,
    treeBuilder,
    balanceChecker = new BalanceChecker(),
    levelOrderTraversal = new LevelOrderTraversal(),
    inOrderTraversal = new InOrderTraversal(),
    preOrderTraversal = new PreOrderTraversal(),
    postOrderTraversal = new PostOrderTraversal(),
  } = {}) {
    this.comparator = comparator;
    this.treeBuilder = treeBuilder || new TreeBuilder(new ArraySanitizer(comparator));
    this.balanceChecker = balanceChecker;
    this.levelOrderTraversal = levelOrderTraversal;
    this.inOrderTraversal = inOrderTraversal;
    this.preOrderTraversal = preOrderTraversal;
    this.postOrderTraversal = postOrderTraversal;
    this.root = this.treeBuilder.build(array);
  }

  includes(value) {
    return this.findNode(this.root, value) !== null;
  }

  findNode(node, value) {
    if (!node) {
      return null;
    }

    const comparison = this.comparator(value, node.data);
    if (comparison === 0) {
      return node;
    }

    return comparison < 0
      ? this.findNode(node.left, value)
      : this.findNode(node.right, value);
  }

  insert(value) {
    this.root = this.insertNode(this.root, value);
  }

  insertNode(node, value) {
    if (!node) {
      return new Node(value);
    }

    const comparison = this.comparator(value, node.data);
    if (comparison === 0) {
      return node;
    }

    if (comparison < 0) {
      node.left = this.insertNode(node.left, value);
    } else {
      node.right = this.insertNode(node.right, value);
    }

    return node;
  }

  deleteItem(value) {
    this.root = this.deleteNode(this.root, value);
  }

  deleteNode(node, value) {
    if (!node) {
      return null;
    }

    const comparison = this.comparator(value, node.data);
    if (comparison < 0) {
      node.left = this.deleteNode(node.left, value);
      return node;
    }

    if (comparison > 0) {
      node.right = this.deleteNode(node.right, value);
      return node;
    }

    if (!node.left) {
      return node.right;
    }

    if (!node.right) {
      return node.left;
    }

    const successor = this.findMinNode(node.right);
    node.data = successor.data;
    node.right = this.deleteNode(node.right, successor.data);
    return node;
  }

  findMinNode(node) {
    return node.left ? this.findMinNode(node.left) : node;
  }

  levelOrderForEach(callback) {
    this.ensureCallback(callback);
    this.levelOrderTraversal.traverse(this.root, callback);
  }

  inOrderForEach(callback) {
    this.ensureCallback(callback);
    this.inOrderTraversal.traverse(this.root, callback);
  }

  preOrderForEach(callback) {
    this.ensureCallback(callback);
    this.preOrderTraversal.traverse(this.root, callback);
  }

  postOrderForEach(callback) {
    this.ensureCallback(callback);
    this.postOrderTraversal.traverse(this.root, callback);
  }

  ensureCallback(callback) {
    if (typeof callback !== 'function') {
      throw new Error('A callback function is required');
    }
  }

  height(value) {
    const node = this.findNode(this.root, value);
    if (!node) {
      return undefined;
    }
    return this.calculateHeight(node);
  }

  calculateHeight(node) {
    if (!node) {
      return -1;
    }
    return 1 + Math.max(this.calculateHeight(node.left), this.calculateHeight(node.right));
  }

  depth(value) {
    return this.calculateDepth(this.root, value, 0);
  }

  calculateDepth(node, value, currentDepth) {
    if (!node) {
      return undefined;
    }

    const comparison = this.comparator(value, node.data);
    if (comparison === 0) {
      return currentDepth;
    }

    return comparison < 0
      ? this.calculateDepth(node.left, value, currentDepth + 1)
      : this.calculateDepth(node.right, value, currentDepth + 1);
  }

  isBalanced() {
    return this.balanceChecker.isBalanced(this.root);
  }

  rebalance() {
    const values = [];
    this.inOrderForEach((value) => values.push(value));
    this.root = this.treeBuilder.build(values);
  }
}

export default BinarySearchTree;
