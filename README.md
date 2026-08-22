# Binary Search Tree

A balanced binary search tree implementation in vanilla JavaScript, built with an emphasis on SOLID principles and clean, self-documenting code.

## Demo
<img width="956" height="514" alt="binary" src="https://github.com/user-attachments/assets/a91ffad2-9ba0-4aa6-899c-ed6ec20a2fc1" />

## Features

- Build a balanced BST from an array of numbers (sorted and deduplicated automatically)
- `includes(value)` — check whether a value exists in the tree
- `insert(value)` — insert a value while preserving the BST property
- `deleteItem(value)` — remove a value, handling leaf, single-child, and two-child cases
- `levelOrderForEach(callback)` — breadth-first traversal
- `inOrderForEach(callback)`, `preOrderForEach(callback)`, `postOrderForEach(callback)` — depth-first traversals
- `height(value)` — number of edges from a node to its deepest leaf
- `depth(value)` — number of edges from a node to the root
- `isBalanced()` — checks the balance condition across every node in the tree
- `rebalance()` — rebuilds a balanced tree from the current in-order sequence

## Project structure

```
index.html                         # Terminal-style web UI
src/
├── Node.js                        # Data structure for a single tree node
├── comparators.js                 # Default numeric comparator
├── ArraySanitizer.js              # Sorts and deduplicates raw input
├── TreeBuilder.js                 # Builds a balanced tree from a sanitized array
├── BalanceChecker.js              # Validates the balance invariant across the whole tree
├── BinarySearchTree.js            # Public API: insert, delete, search, height, depth, rebalance
├── TreeAsciiRenderer.js           # Builds the box-drawing tree representation as lines of text
├── prettyPrint.js                 # Console visualization helper (built on TreeAsciiRenderer)
├── RandomArrayGenerator.js        # Test data generator used by the driver script
├── driver.js                      # Node.js script demonstrating every feature end to end
├── traversals/
│   ├── TraversalStrategy.js       # Base contract shared by all traversal strategies
│   ├── LevelOrderTraversal.js
│   ├── InOrderTraversal.js
│   ├── PreOrderTraversal.js
│   └── PostOrderTraversal.js
└── ui/
    ├── NumberListParser.js        # Parses space-separated numeric input
    ├── TreeSummaryBuilder.js      # Builds the height/balance/traversal summary shown in the UI
    ├── TreeUIController.js        # Wires DOM elements to BinarySearchTree operations
    └── main.js                    # Composition root for the web UI
```

The same `BinarySearchTree` source powers both the Node.js driver and the browser UI — the algorithm is written once, as ES modules, and consumed from either entry point.

## Design principles

**Single Responsibility** — each class has exactly one reason to change: `ArraySanitizer` only cleans input, `TreeBuilder` only builds nodes, `BalanceChecker` only evaluates balance, each traversal class only walks the tree in one order, and `BinarySearchTree` only orchestrates these collaborators behind a public API.

**Open/Closed** — new traversal orders or a different sanitization/build strategy can be added by creating new classes that implement the existing contracts, without modifying `BinarySearchTree`.

**Liskov Substitution** — every traversal strategy extends `TraversalStrategy` and can be swapped for another without changing how `BinarySearchTree` calls it.

**Interface Segregation** — collaborators expose a single, narrow method (`sanitize`, `build`, `isBalanced`, `traverse`) rather than a broad, catch-all interface.

**Dependency Inversion** — `BinarySearchTree` depends on injected abstractions (`comparator`, `treeBuilder`, `balanceChecker`, traversal strategies) rather than constructing its own concrete dependencies internally, so any of them can be substituted at construction time.

## Usage

```js
const BinarySearchTree = require('./src/BinarySearchTree');

const tree = new BinarySearchTree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);

tree.insert(15);
tree.deleteItem(8);

console.log(tree.includes(15));
console.log(tree.isBalanced());

tree.levelOrderForEach((value) => console.log(value));
```

### Custom comparator

The tree accepts a custom comparator for non-numeric or custom-ordering use cases:

```js
const tree = new BinarySearchTree(['banana', 'apple', 'cherry'], {
  comparator: (a, b) => a.localeCompare(b),
});
```

## Running the demo

```
node src/driver.js
```

The driver script:

1. Builds a tree from an array of random numbers under 100
2. Confirms it is balanced
3. Prints the tree in level, pre, post, and in order
4. Inserts several values above 100 to unbalance the tree
5. Confirms it is unbalanced
6. Rebalances the tree
7. Confirms it is balanced again and prints all traversal orders

## Running the web UI

`index.html` loads the same tree logic as ES modules directly in the browser, so it needs to be served over `http://` rather than opened as a `file://` URL (browsers block ES module imports from the filesystem). From the project root:

```
python3 -m http.server 8000
```

Then open `http://localhost:8000` in a browser. Any static file server (e.g. `npx serve`, VS Code's Live Server, or GitHub Pages) works the same way.

The page has three panels:

- **Input** — type space-separated numbers and press Enter/Tab to build the tree, insert or remove individual numbers, look up a number's depth, or rebalance the tree.
- **Output** — the tree rendered with the same box-drawing style as `prettyPrint()`, root on the left.
- **Information** — current height, whether the tree is balanced, and all four traversal orders, recalculated after every operation.

## Running tests manually

```
node -e "
const BinarySearchTree = require('./src/BinarySearchTree');
const tree = new BinarySearchTree([1,7,4,23,8,9,4,3,5,7,9,67,6345,324]);
console.log(tree.includes(8));
console.log(tree.height(8));
console.log(tree.depth(8));
"
```
