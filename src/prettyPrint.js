import TreeAsciiRenderer from './TreeAsciiRenderer.js';

const prettyPrint = (root) => {
  const renderer = new TreeAsciiRenderer();
  renderer.render(root).forEach((line) => console.log(line));
};

export default prettyPrint;
