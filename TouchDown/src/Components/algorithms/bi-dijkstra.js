// Performs Dijkstra's algorithm; returns *all* nodes in the order
// in which they were visited. Also makes nodes point back to their
// previous node, effectively allowing us to compute the shortest path
// by backtracking from the finish node.
//Implementation of Bi-directional search in Dijkstra algorithm
import _ from "lodash" ;
export function bidijkstra(grid,startNode,finishNode,diagonalallowed){
    const visitedNodesInOrder = []; //maintains the nodes to be visualised
    const TempEnd=[]; //maintains the list from end node till interscetion node
    const TempStart=[];//maintains the list from start node till intersection node
    const tempstart = _.cloneDeep(startNode);
    tempstart.distance=0;
    const tempend = _.cloneDeep(finishNode);
    tempend.distance=0;
    TempStart.push(tempstart);
    TempEnd.push(tempend);
    while (TempStart.length>0 && TempEnd.length>0){
      //putting the smallest node from TempStart in visitedNodesinOrder
        sortNodesByDistance(TempStart);
      const closestNode = TempStart.shift();
      if (closestNode.isWall && closestNode.wallweight==999999) continue ;
      if (closestNode.distance === Infinity) return visitedNodesInOrder;
      closestNode.startvisited = true;
      const unvisitedNeighbors = getUnvisitedNeighbors(closestNode, grid,diagonalallowed);
      for (const neighbor of unvisitedNeighbors){
        if (neighbor.startvisited) continue ;
        neighbor.previousNode = closestNode;
          neighbor.startvisited = true;
          neighbor.distance = closestNode.distance + closestNode.wallweight;
          TempStart.push(neighbor);
      }
      visitedNodesInOrder.push(closestNode);
      //if we reach the finish node from start side
      if (closestNode === finishNode) {
        var temp1 = [closestNode];
        visitedNodesInOrder.unshift(temp1)
        return visitedNodesInOrder;
      }
      //if we reach the intersecting nodes
      if (closestNode.endvisited){
        var temp2 = [closestNode];
        visitedNodesInOrder.unshift(temp2)
        return visitedNodesInOrder;
      }
      //after putting the shortest distance node from Tempstart then we will put a node from TempEnd in visitedNodesInOrder
      sortNodesByDistance(TempEnd);
      const closestNodeEnd = TempEnd.shift();
      if (closestNodeEnd.isWall && closestNodeEnd.wallweight==999999) continue ;
      if (closestNodeEnd.distance === Infinity) return visitedNodesInOrder;
      closestNodeEnd.endvisited = true;
      const unvisitedNeighbors2 = getUnvisitedNeighbors(closestNodeEnd, grid,diagonalallowed);
      for (const neighbor of unvisitedNeighbors2){
        if (neighbor.endvisited) continue ;
         neighbor.next=closestNodeEnd; 
         // neighbor.previousNode = closestNodeEnd;
          neighbor.endvisited = true;
          neighbor.distance = closestNodeEnd.distance + closestNodeEnd.wallweight;
          TempEnd.push(neighbor);
          // console.log("Neighbor updation");
      }
      visitedNodesInOrder.push(closestNodeEnd);
      //if we reach the startnode from end side
      if (closestNodeEnd === startNode) {
          //console.log("Reached End");
        var temp1 = [closestNodeEnd];
        visitedNodesInOrder.unshift(temp1)
        return visitedNodesInOrder;
      }
      //if we find the intersecting nodes
      if (closestNodeEnd.startvisited){
          //console.log("Hurrayyyy!!!");
        var temp2 = [closestNodeEnd];
        visitedNodesInOrder.unshift(temp2)
        return visitedNodesInOrder;
      }
      
      
    }
    //if nodes in TempStart are left to be visualised
    while ( TempStart.length>0){
        // console.log("Start side left");
        sortNodesByDistance(TempStart);
      const closestNode = TempStart.shift();
      if (closestNode.isWall && closestNode.wallweight==999999) continue ;
      if (closestNode.distance === Infinity) return visitedNodesInOrder;
      closestNode.startvisited = true;
      const unvisitedNeighbors = getUnvisitedNeighbors(closestNode, grid,diagonalallowed);
      for (const neighbor of unvisitedNeighbors){
        if (neighbor.startvisited) continue ;
         neighbor.previousNode = closestNode;
          neighbor.startvisited = true;
          neighbor.distance = closestNode.distance + closestNode.wallweight;
          TempStart.push(neighbor);
      }
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

      
    }
    //if nodes in tempend are left to be visualised
    while (TempEnd.length>0){
        // console.log("End side left");
      sortNodesByDistance(TempEnd);
      const closestNodeEnd = TempEnd.shift();
      if (closestNodeEnd.isWall && closestNodeEnd.wallweight==999999) continue ;
      if (closestNodeEnd.distance === Infinity) return visitedNodesInOrder;
      closestNodeEnd.endvisited = true;
      const unvisitedNeighbors2 = getUnvisitedNeighbors(closestNodeEnd, grid,diagonalallowed);
      for (const neighbor of unvisitedNeighbors2){
        if (neighbor.endvisited) continue ;
        neighbor.next=closestNodeEnd;
          neighbor.endvisited = true;
          neighbor.distance = closestNodeEnd.distance + closestNodeEnd.wallweight;
          TempEnd.push(neighbor);
      }
      visitedNodesInOrder.push(closestNodeEnd);
      if (closestNodeEnd === startNode) {
        var temp1 = [closestNodeEnd];
        visitedNodesInOrder.unshift(temp1)
        return visitedNodesInOrder;
      }
      if (closestNodeEnd.startvisited){
        var temp2 = [closestNodeEnd];
        visitedNodesInOrder.unshift(temp2)
        return visitedNodesInOrder;
      }
      
    }
  }
  //sorts the node by distance parameter
  function sortNodesByDistance(unvisitedNodes) {
    unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
  }
  
  //Get all neighbors
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
  
  
  
  // Backtracks from the finishNode to find the shortest path.
  // Only works when called after the bi-dijkstra method above.
  export function getNodesInShortestPathOrder(finishNode) {
    const nodesInShortestPathOrder = [];
    let currentNode = finishNode;
    while (currentNode !== null) {
      nodesInShortestPathOrder.unshift(currentNode);
      currentNode = currentNode.previousNode;
    }
    return nodesInShortestPathOrder;
  }
  //This function finds the shortest path in bi-directional search.It starts visualisaing the shortest path from both start node and end node side and at the end visualises the intersecting node.
  export function bidfsans(node) {
    //Here node is the intersecting node which is the only node having both previousNode and next
    // return [node];
    //console.log(node);
    var ans = [];
    let s = node;   //To traverse the start side
    let e = node;   //To traverse the end side
    // console.log(s);
    // console.log(e);
    while (s.previousNode !== null && e.next!== null){
      ans.unshift(s.previousNode);
      ans.unshift(e.next);
      s = s.previousNode;
      e = e.next ;
    }
    //if the nodes from start side are left
    while (s.previousNode !== null){
        // console.log("Wohooo");
      ans.unshift(s.previousNode);
      s = s.previousNode;
    }
    //if nodes from end side are left
    while (e.next !== null){
      ans.unshift(e.next);
      e = e.next ;
    }
    ans.push(node)
    return ans
  }
  