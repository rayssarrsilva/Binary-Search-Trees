import BinarySearchTree from './BinarySearchTree.js';
import RandomArrayGenerator from './RandomArrayGenerator.js';
import prettyPrint from './prettyPrint.js';

const printAllOrders = (tree) => {
  const levelOrder = [];
  const preOrder = [];
  const postOrder = [];
  const inOrder = [];

  tree.levelOrderForEach((value) => levelOrder.push(value));
  tree.preOrderForEach((value) => preOrder.push(value));
  tree.postOrderForEach((value) => postOrder.push(value));
  tree.inOrderForEach((value) => inOrder.push(value));

  console.log('Level order:', levelOrder.join(', '));
  console.log('Pre order:', preOrder.join(', '));
  console.log('Post order:', postOrder.join(', '));
  console.log('In order:', inOrder.join(', '));
};

const randomArrayGenerator = new RandomArrayGenerator(100, 15);
const tree = new BinarySearchTree(randomArrayGenerator.generate());

console.log('Initial tree:');
prettyPrint(tree.root);
console.log('Is balanced:', tree.isBalanced());
printAllOrders(tree);

const largeValues = [150, 200, 175, 300, 250];
largeValues.forEach((value) => tree.insert(value));

console.log('\nAfter inserting values above 100:');
console.log('Is balanced:', tree.isBalanced());

tree.rebalance();

console.log('\nAfter rebalancing:');
console.log('Is balanced:', tree.isBalanced());
prettyPrint(tree.root);
printAllOrders(tree);
