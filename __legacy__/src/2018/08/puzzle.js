const every = require('lodash.every');
const { unique, sum, flatten } = require('../../utils');

const parse = (data) => {
  const stack = [];
  const nodes = [];
  const order = {};
  let id = 0;
  let parentId = -1;

  while (data.length) {
    const [childCount, metaCount] = data.splice(0, 2);

    stack.push({
      childCount,
      metaCount,
      parentId,
      id: id++,
    });

    while (stack.length) {
      const current = stack.pop();
      if (current.childCount === 0) {
        const parent = current.parentId !== -1 ? current.parentId : null;
        order[parent] = (order[parent] || 0) + 1;
        nodes.push({
          id: current.id,
          parent,
          index: order[parent],
          meta: data.splice(0, current.metaCount),
        });
      } else {
        parentId = current.id;
        stack.push({
          ...current,
          childCount: current.childCount - 1,
        });
        break;
      }
    }
  }

  return nodes.reverse();
};

function first(input) {
  let data = input[0].split(' ').map((n) => parseInt(n, 10));
  const nodes = parse(data);

  return sum(flatten(nodes.map((n) => n.meta)));
}

function second(input) {
  const data = parse(input[0].split(' ').map(Number));

  const meta = [];
  const stack = [data.find((d) => d.parent === null)];

  while (stack.length > 0) {
    const node = stack.pop();
    const children = data.filter((d) => d.parent === node.id);
    if (children.length === 0) {
      meta.push(...node.meta);
    } else {
      stack.push(
        ...node.meta.reduce((nodes, index) => {
          const child = children.find((c) => c.index === index);
          return child ? [...nodes, child] : nodes;
        }, [])
      );
    }
  }

  return sum(meta);
}

module.exports = {
  first,
  second,
};
