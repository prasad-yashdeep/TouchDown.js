//This is my variation of BEST FIRST SEARCH
export function Bestfs(grid, startNode, finishNode,heuristic,diagonalallowed) {
    const visitedNodesInOrder = []; //closed list
    startNode.distance = 0;
    const unvisitedNodes = getAllNodes(grid); //open list
    //Till unvisited ndoes is empty we run the while loop
    while (unvisitedNodes.length>0) {
      //Sorting the unvisited Nodes by length
      sortNodesByDistance(unvisitedNodes);
      const closestNode = unvisitedNodes.shift();
      // If we encounter a wall, we skip it.
      if (closestNode.isWall && closestNode.wallweight==99999999) continue;
      // If the closest node is at a distance of infinity,
      // we must be trapped and should therefore stop.
      if (closestNode.distance === Infinity) return visitedNodesInOrder;
      closestNode.isVisited = true;
      visitedNodesInOrder.push(closestNode);
      //If closesnode is the end node we return visitedNodesInorder
      if (closestNode === finishNode) return visitedNodesInOrder;
      updateUnvisitedNeighbors(closestNode, grid,finishNode,heuristic,diagonalallowed,closestNode.wallweight);
    }
  }
  function sortNodesByDistance(unvisitedNodes) {
    unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
  }
  //update the heuristic of the unvisited neighbors
  function updateUnvisitedNeighbors(node, grid,finishNode,heuristic,diagonalallowed,wallweight) {
    const unvisitedNeighbors = getUnvisitedNeighbors(node, grid,diagonalallowed);
    for (const neighbor of unvisitedNeighbors) {
      //value variable will store the heuristic distance of the node
      var value;
      var string="Manhattan";
      var string2="Diagonal";
      var string3="Euclidean";
      var string4="Octile";
      var string5="Chebyshev";
      if(heuristic.localeCompare(string)==0)
      {
        value=Math.abs(neighbor.row-finishNode.row)+Math.abs(neighbor.col-finishNode.col);
        
      }
      else if(heuristic.localeCompare(string2)==0)
      {
        value=Math.max(Math.abs(neighbor.row-finishNode.row),Math.abs(neighbor.col-finishNode.col));
       
      }
      else if(heuristic.localeCompare(string3)==0)
      {
        value=Math.sqrt(Math.pow((neighbor.row-finishNode.row),2)+Math.pow((neighbor.col-finishNode.col),2));
      
      }
      else if(heuristic.localeCompare(string4)==0)
      {
        var x_dist=Math.abs(neighbor.row-finishNode.row);
        var y_dist=Math.abs(neighbor.col-finishNode.col);
        value=Math.max(x_dist,y_dist)+(Math.sqrt(2)-1) * Math.min(x_dist,y_dist);
        
      }
      else if(heuristic.localeCompare(string5)==0)
      {
        value=Math.max(Math.abs(neighbor.row-finishNode.row),Math.abs(neighbor.col-finishNode.col));
        
      }
      //making the neighbor distance as heuristic distance.If the neighbor node is a weighted wall then a penalty is added to the heuristic distance
      neighbor.distance=value*wallweight;
      neighbor.previousNode = node; // making the node as previous Node of neighbor
      neighbor.isVisited=true;
      //adjusting the visited state and previousNode of the neighbor
    }
  }
  //retruns all unvisited neighbors
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
    //filtering the neighbors
    return neighbors.filter(neighbor => !neighbor.isVisited);
  }
  //Returns all nodes
  function getAllNodes(grid) {
    const nodes = [];
    for (const row of grid) {
      for (const node of row) {
        nodes.push(node);
      }
    }
    return nodes;
  }
  
  