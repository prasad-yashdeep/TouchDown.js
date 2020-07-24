import _ from "lodash" ;
//Implementation of Bidirectional Best First Search
export function BiBestfs(grid, startNode, finishNode,heuristic,diagonalallowed) {
  const visitedNodesInOrder = []; //closed list
  const TempEnd=[]; //Put all nodes from end node till intersecting nodes in it
    const TempStart=[]; //Put all nodes from start node till intersecting nodes in it
    const tempstart = _.cloneDeep(startNode); //cloning the start node
    tempstart.distance=0;
    const tempend = _.cloneDeep(finishNode);//cloing the finish node
    tempend.distance=0;
    TempStart.push(tempstart);
    TempEnd.push(tempend);
  while (TempStart.length>0 && TempEnd.length>0) {
    sortNodesByDistance(TempStart);
    const closestNode = TempStart.shift();
    // If we encounter a wall, we skip it.
    if (closestNode.isWall && closestNode.wallweight==99999999) continue;
    // If the closest node is at a distance of infinity,
    // we must be trapped and should therefore stop.
    if (closestNode.distance === Infinity) return visitedNodesInOrder;
    closestNode.startvisited = true;
    visitedNodesInOrder.push(closestNode);
    updateUnvisitedNeighborsStart(closestNode, grid,finishNode,heuristic,diagonalallowed,TempStart,closestNode.wallweight);
    if (closestNode === finishNode) 
    {
      //console.log("Hello");
        var temp1 = [closestNode];
        visitedNodesInOrder.unshift(temp1)
        return visitedNodesInOrder;
    }
    if (closestNode.endvisited){
      // console.log("Hi");
    var temp2 = [closestNode];
    visitedNodesInOrder.unshift(temp2)
    return visitedNodesInOrder;
  }
    //Sorting the TempEnd to extract the node with shortest distance
    sortNodesByDistance(TempEnd);
    const closestNode2 = TempEnd.shift();
    // If we encounter a wall, we skip it.
    if (closestNode2.isWall && closestNode2.wallweight==99999999) continue;
    // If the closest node is at a distance of infinity,
    // we must be trapped and should therefore stop.
    if (closestNode2.distance === Infinity) return visitedNodesInOrder;
    closestNode2.endvisited = true;
    updateUnvisitedNeighborsEnd(closestNode2, grid,finishNode,heuristic,diagonalallowed,TempEnd,closestNode2.wallweight);
    visitedNodesInOrder.push(closestNode2);
    if (closestNode2 === startNode) 
    {
      //console.log("Hello");
        var temp1 = [closestNode2];
        visitedNodesInOrder.unshift(temp1)
        return visitedNodesInOrder;
    }
    if (closestNode2.startvisited){
      //console.log("Hurrayyyy!!!");
    var temp2 = [closestNode2];
    visitedNodesInOrder.unshift(temp2)
    return visitedNodesInOrder;
    }
   
  }
  //If nodes in TempStart are left to be visualised
  while ( TempStart.length>0){
    // console.log("Start side left");
    sortNodesByDistance(TempStart);
    const closestNode = TempStart.shift();
    // If we encounter a wall, we skip it.
    if (closestNode.isWall && closestNode.wallweight==99999999) continue;
    // If the closest node is at a distance of infinity,
    // we must be trapped and should therefore stop.
    if (closestNode.distance === Infinity) return visitedNodesInOrder;
    closestNode.startvisited = true;
    updateUnvisitedNeighborsStart(closestNode, grid,finishNode,heuristic,diagonalallowed,TempStart,closestNode.wallweight);
    visitedNodesInOrder.push(closestNode);
    //if we reach the finishnode from starting point in bi-direction search
    if (closestNode === finishNode) 
    {
      //console.log("Hello");
        var temp1 = [closestNode];
        visitedNodesInOrder.unshift(temp1)
        return visitedNodesInOrder;
    }
    //if the intersecting node is found
    if (closestNode.endvisited){
      // console.log("Hi");
    var temp2 = [closestNode];
    visitedNodesInOrder.unshift(temp2)
    return visitedNodesInOrder;
    }
     
  }
  //If nodes in TempEnd are left to be visualised
  while (TempEnd.length>0){
    // console.log("End side left");
    sortNodesByDistance(TempEnd);
    const closestNode2 = TempEnd.shift();
    // If we encounter a wall, we skip it.
    if (closestNode2.isWall && closestNode2.wallweight==99999999) continue;
    // If the closest node is at a distance of infinity,
    // we must be trapped and should therefore stop.
    if (closestNode2.distance === Infinity) return visitedNodesInOrder;
    closestNode2.endvisited = true;
    updateUnvisitedNeighborsEnd(closestNode2, grid,finishNode,heuristic,diagonalallowed,TempEnd,closestNode2.wallweight);
    visitedNodesInOrder.push(closestNode2);
    //if the the shortest distance from end side reaches the start side
    if (closestNode2 === startNode) 
    {
      //console.log("Hello");
        var temp1 = [closestNode2];
        visitedNodesInOrder.unshift(temp1)
        return visitedNodesInOrder;
    }
    //if intersecting node is found
    if (closestNode2.startvisited){
      //console.log("Hurrayyyy!!!");
    var temp2 = [closestNode2];
    visitedNodesInOrder.unshift(temp2)
    return visitedNodesInOrder;
    }

  }
}
function sortNodesByDistance(unvisitedNodes) {
  unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
}
//to update the heuristic distanc of unvisited neighbors
function updateUnvisitedNeighborsEnd(node, grid,finishNode,heuristic,diagonalallowed,TempEnd,wallweight) {
  const unvisitedNeighbors = getUnvisitedNeighbors(node, grid,diagonalallowed);
  for (const neighbor of unvisitedNeighbors) {
    if (neighbor.endvisited) continue ;
    //console.log(finishNode.col);
    //console.log(neighbor.col);
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
    neighbor.next=node; 
    // neighbor.previousNode = closestNodeEnd;
     neighbor.endvisited = true;
     neighbor.distance = value+wallweight;
     TempEnd.push(neighbor);
  }
}
//Update the heuristic distance of unvisited neighbors 
function updateUnvisitedNeighborsStart(node, grid,finishNode,heuristic,diagonalallowed,TempStart,wallweight) {
  const unvisitedNeighbors = getUnvisitedNeighbors(node, grid,diagonalallowed);
  for (const neighbor of unvisitedNeighbors) {
    if (neighbor.startvisited) continue ;
    var value; //value variable will store the heuristic distance
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
    neighbor.previousNode = node; //making the node as previous node of neighbor
          neighbor.startvisited = true; //neighbor is visited from start side
          neighbor.distance = value+wallweight; //if neighbor is a weighted wall then its distance is heuristic+wall weight
          TempStart.push(neighbor); 
  }
}
//To get all neighbors of a node
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
  return neighbors;
}

