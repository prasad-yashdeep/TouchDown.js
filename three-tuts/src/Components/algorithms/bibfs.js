export function bbfs(grid,startNode,finishNode,diagonalallowed){
  const visitedNodesInOrder = [];
  startNode.distance = 0; finishNode.distance = 0
  const startqueue = [startNode];
  startNode.startvisited = true;
  finishNode.endvisited = true;
  const endqueue = [finishNode];
  while (!!startqueue.length && endqueue.length){
    const closestNode = startqueue.shift();
    if (closestNode.isWall) continue ;
    if (closestNode.distance === Infinity) return visitedNodesInOrder;
    closestNode.isVisited = true;
    visitedNodesInOrder.push(closestNode);
    if (closestNode === finishNode) {
      var temp1 = [closestNode];
      visitedNodesInOrder.unshift(temp1)
      return visitedNodesInOrder;
    }
    if (closestNode.endvisited){
      var temp2 = [closestNode];
      visitedNodesInOrder.unshift(temp2)
      return visitedNodesInOrder;
    }
    const unvisitedNeighbors = getUnvisitedNeighbors(closestNode, grid,diagonalallowed);
    for (const neighbor of unvisitedNeighbors){
      if (neighbor.startvisited) continue ;
      if (neighbor.endvisited){
        var temp3 = [neighbor];
      neighbor.previousNode = closestNode;
        neighbor.startvisited = true;
        neighbor.distance = closestNode.distance + 1;
        startqueue.push(neighbor);
      visitedNodesInOrder.unshift(temp3)
      return visitedNodesInOrder;
      }
        neighbor.previousNode = closestNode;
        neighbor.startvisited = true;
        neighbor.distance = closestNode.distance + 1;
        startqueue.push(neighbor);
    }

    const ftNode = endqueue.shift();
    if (ftNode.isWall) continue ;
    if (ftNode.distance === Infinity) return visitedNodesInOrder;
    ftNode.isVisited = true;
    visitedNodesInOrder.push(ftNode);
    if (ftNode === startNode) {
      var temp4 = [ftNode];
      visitedNodesInOrder.unshift(temp4)
      return visitedNodesInOrder;
    }
    if (ftNode.startvisited){
      var temp5 = [ftNode];
      visitedNodesInOrder.unshift(temp5)
      return visitedNodesInOrder;
    }
    const unvisitedNeighbor = getUnvisitedNeighbors(ftNode, grid,diagonalallowed);
    for (const neighbora of unvisitedNeighbor){
      if (neighbora.endvisited) continue ;
      if (neighbora.startvisited){
      var temp6 = [neighbora];
      visitedNodesInOrder.unshift(temp6)
      neighbora.nex = ftNode;
      neighbora.endvisited = true;
      neighbora.distance = ftNode.distance + 1;
      endqueue.push(neighbora);
      return visitedNodesInOrder;
    }
      neighbora.nex = ftNode;
      neighbora.endvisited = true;
      neighbora.distance = ftNode.distance + 1;
      endqueue.push(neighbora);
    }
  }
  var temp = [finishNode]
  visitedNodesInOrder.unshift(temp)
  return visitedNodesInOrder 
}
function sortNodesByDistance(unvisitedNodes) {
  unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
}

function updateUnvisitedNeighbors(node, grid) {
  const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);
  for (const neighbor of unvisitedNeighbors) {
    neighbor.distance = node.distance + 1;
    neighbor.previousNode = node;
  }
}

function getUnvisitedNeighbors(node, grid,diagonalallowed) {
  const neighbors = [];
  const {col, row} = node;
  if (row > 0) neighbors.push(grid[row - 1][col]);
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
  if (col > 0) neighbors.push(grid[row][col - 1]);
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
  if (diagonalallowed){
    if (row > 0 && col > 0) neighbors.push(grid[row-1][col-1]);
    if (row > 0 && col < grid[0].length - 1) neighbors.push(grid[row-1][col+1]);
    if (row <  grid.length - 1 && col > 0 ) neighbors.push(grid[row+1][col-1]);
    if (row <  grid.length - 1 && col < grid[0].length - 1) neighbors.push(grid[row+1][col+1]);
    
  }
  return neighbors
}

function getAllNodes(grid) {
  const nodes = [];
  for (const row of grid) {
    for (const node of row) {
      nodes.push(node);
    }
  }
  return nodes;
}

// Backtracks from the finishNode to find the shortest path.
// Only works when called *after* the dijkstra method above.
export function bibfsans(node) {
  // return [node];
  var ans = []
  let s = node ;  let e = node
  while (s.previousNode !== null && e.nex !== null){
    ans.unshift(s.previousNode);
    ans.unshift(e.nex)
    s = s.previousNode;
    e = e.nex ;
  }
  while (s.previousNode !== null){
    ans.unshift(s.previousNode);
    s = s.previousNode;
  }
  while (e.nex !== null){
    ans.unshift(e.nex);
    e = e.nex ;
  }
  ans.push(node)
  return ans
}