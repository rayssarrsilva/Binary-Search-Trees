import TreeUIController from './TreeUIController.js';

const elements = {
  buildInput: document.getElementById('build-input'),
  insertInput: document.getElementById('insert-input'),
  insertButton: document.getElementById('insert-button'),
  deleteInput: document.getElementById('delete-input'),
  deleteButton: document.getElementById('delete-button'),
  findInput: document.getElementById('find-input'),
  findButton: document.getElementById('find-button'),
  findResult: document.getElementById('find-result'),
  rebalanceButton: document.getElementById('rebalance-button'),
  output: document.getElementById('tree-output'),
  height: document.getElementById('info-height'),
  balanced: document.getElementById('info-balanced'),
  levelOrder: document.getElementById('info-level-order'),
  preOrder: document.getElementById('info-pre-order'),
  inOrder: document.getElementById('info-in-order'),
  postOrder: document.getElementById('info-post-order'),
};

const controller = new TreeUIController(elements);
controller.init();
