interface Node<T> {
  id: string;
  out: Node<T>[];
  props: T;
}

interface FromEdgesSettings<T> {
  isBiDirectional: boolean;
  getNodeProps: (id: string) => T;
}

function createGraphFromEdges<T>(
  edges: { from: string; to: string }[],
  settings: FromEdgesSettings<T>
): Graph<T> {
  let _edges = edges.slice();
  if (settings.isBiDirectional) {
    // add reversed edges if bi directional
    _edges = _edges.concat(
      _edges.map(({ from, to }) => ({ from: to, to: from }))
    );
  }

  const relations = _edges
    .map(({ from, to }) => {
      // create nodes for all edges
      const id = from;

      const inboundEdges = settings.isBiDirectional
        ? _edges.filter((edge) => edge.to === id).map((edge) => edge.from)
        : [];

      return {
        id,
        out: [to].concat(inboundEdges),
      };
    })
    .toGroupedEntries((node) => node.id)
    .map(([id, nodes]) => ({
      id: `${id}`,
      out: nodes.flatMap((nodes) => nodes.out).unique((node) => node),
    }))
    .toObject((relation) => relation.id);

  const nodes = Object.keys(relations).map((id) => ({
    id,
    props: settings.getNodeProps(id),
    out: [] as Node<T>[],
  }));

  const nodesLookup = nodes.toObject((node) => node.id);

  nodes.forEach((node) => {
    // populate out
    node.out = relations[node.id].out.map((outId) => nodesLookup[outId]);
  });

  return new Graph(nodes);
}
type TraversalQuery<T> = (node: Node<T>) => boolean;

type TraversalPredicate<T> = (
  node: Node<T>,
  target: Node<T>,
  traversal: Node<T>[]
) => boolean;

export class Graph<NodeProps> {
  constructor(private readonly nodes: Node<NodeProps>[]) {}

  getNode(id: string): Node<NodeProps> | undefined {
    return this.nodes.find((node) => node.id === id);
  }

  traverse(
    start: string,
    query: TraversalQuery<NodeProps>,
    predicate: TraversalPredicate<NodeProps>,
    traversal: Node<NodeProps>[] = []
  ): Node<NodeProps>[][] {
    const node = this.getNode(start);

    if (!node) return [[]]; // nope

    const _traversal = traversal.concat(node);

    // Found what we are looking for
    if (query(node)) return [_traversal];

    const next = node.out
      .filter((_node) => _node.id !== node.id)
      .filter((_node) => predicate(node, _node, _traversal));

    return next.flatMap((_node) =>
      this.traverse(_node.id, query, predicate, _traversal)
    );
  }

  static fromEdges<T>(
    edges: { from: string; to: string }[],
    settings: FromEdgesSettings<T>
  ): Graph<T> {
    return createGraphFromEdges(edges, settings);
  }

  print() {
    console.log(
      this.nodes.map(
        (node) => `${node.id} => ${node.out.map((n) => n.id).join(',')}`
      )
    );
  }
}
