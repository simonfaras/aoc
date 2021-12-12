import { Graph, Input } from '../../../utils';

const isLarge = (id: string) => id === id.toUpperCase();

function parseInput(input: Input) {
  const edges = input
    .asRows()
    .map((row) => row.split('-'))
    .map(([from, to]) => ({ from, to }));

  return Graph.fromEdges(edges, {
    isBiDirectional: true,
    getNodeProps: (id) => ({
      isLarge: isLarge(id),
    }),
  });
}

export function first(input: Input) {
  const data = parseInput(input);

  const paths = data.traverse(
    'start',
    (node) => node.id === 'end',
    (from, to, traversal) => {
      return to.props.isLarge || !traversal.find((node) => node.id === to.id);
    }
  );

  return paths.length;
}

export function second(input: Input) {
  const data = parseInput(input);

  const paths = data.traverse(
    'start',
    (node) => node.id === 'end',
    (from, to, traversal) => {
      // Large is ok
      if (to.props.isLarge) return true;
      // Not to start
      if (to.id === 'start') return false;

      // is ok if small and not yet visited, or no other small nodes has been visited twice
      return (
        !traversal.find((node) => node.id === to.id) ||
        !traversal
          .duplicates((node) => node.id)
          .some((node) => !node.props.isLarge)
      );
    }
  );

  return paths.length;
}
