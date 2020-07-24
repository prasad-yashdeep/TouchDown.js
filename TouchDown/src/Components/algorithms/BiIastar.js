//My variation of A star algorithm
//Bi directional search of Dijkstra algorithm with heuristics
import _ from "lodash" ;
export function BiIastar(grid, startNode, finishNode,heuristic,diagonalallowed) {
    const visitedNodesInOrder = []; //closed list
    const TempEnd=[]; //Nodes from ending node till intersection node
    const TempStart=[]; //Nodes from starting node till intersection node
    const tempstart = _.cloneDeep(startNode);
    tempstart.distance=0;
    const tempend = _.cloneDeep(finishNode);
    tempend.distance=0;
    TempStart.push(tempstart);
    TempEnd.push(tempend);
    while (TempStart.length>0 && TempEnd.length>0) {
      sortNodesByDistance(TempStart);
      const closestNode = TempStart.shift();
      // If we encounter a wall, we skip it.
      if (closestNode.isWall && closestNode.wallweight==999999) 
      {
        continue;
      }
      // If the closest node is at a distance of infinity,
      // we must be trapped and should therefore stop.
      if (closestNode.distance === Infinity) return visitedNodesInOrder;
      closestNode.startvisited = true;
      visitedNodesInOrder.push(closestNode);
      updateUnvisitedNeighborsStart(closestNode, grid,finishNode,heuristic,diagonalallowed,TempStart,closestNode.wallweight);
        if(closestNode === finishNode) 
        {
      //console.log("Hello");
        var temp1 = [closestNode];
        visitedNodesInOrder.unshift(temp1)
        return visitedNodesInOrder;
        }
        //if the node with shortest distance is the intersection node
        if (closestNode.endvisited)
        {
        // console.log("Hi");
        var temp2 = [closestNode];
        visitedNodesInOrder.unshift(temp2)
        return visitedNodesInOrder;
        }
        //Extract the node woth shortest distance from TempEnd
        sortNodesByDistance(TempEnd);
      const closestNode2 = TempEnd.shift();
      // If we encounter a wall, we skip it.
      if (closestNode2.isWall && closestNode2.wallweight==999999) continue;
      // If the closest node is at a distance of infinity,
      // we must be trapped and should therefore stop.
      if (closestNode2.distance === Infinity) return visitedNodesInOrder;
      closestNode2.endvisited = true;
      updateUnvisitedNeighborsEnd(closestNode2, grid,finishNode,heuristic,diagonalallowed,TempEnd,closestNode2.wallweight);
      visitedNodesInOrder.push(closestNode2);  
      if(closestNode2 === startNode) 
        {
      //console.log("Hello");
        var temp1 = [closestNode2];
        visitedNodesInOrder.unshift(temp1)
        return visitedNodesInOrder;
        }
        if (closestNode2.startvisited)
        {
        // console.log("Hi");
        var temp2 = [closestNode2];
        visitedNodesInOrder.unshift(temp2)
        return visitedNodesInOrder;
        }
    }
    //If tempStart has nodes left within it
    while(TempStart.length>0)
    {
        sortNodesByDistance(TempStart);
      const closestNode = TempStart.shift();
      // If we encounter a wall, we skip it.
      if (closestNode.isWall && closestNode.wallweight==999999) continue;
      // If the closest node is at a distance of infinity,
      // we must be trapped and should therefore stop.
      if (closestNode.distance === Infinity) return visitedNodesInOrder;
      closestNode.startvisited = true;
      visitedNodesInOrder.push(closestNode);
      updateUnvisitedNeighborsStart(closestNode, grid,finishNode,heuristic,diagonalallowed,TempStart,closestNode.wallweight);
      //If no intersection node is found  
      if(closestNode === finishNode) 
        {
      //console.log("Hello");
        var temp1 = [closestNode];
        visitedNodesInOrder.unshift(temp1)
        return visitedNodesInOrder;
        }
        //if intersection node is found we stop the search
        if (closestNode.endvisited)
        {
        // console.log("Hi");
        var temp2 = [closestNode];
        visitedNodesInOrder.unshift(temp2)
        return visitedNodesInOrder;
        }
    }
    //While Nodes in TempEnd are left
    while(TempEnd.length>0)
    {
        sortNodesByDistance(TempEnd);
        const closestNode2 = TempEnd.shift();
        // If we encounter a wall, we skip it.
        if (closestNode2.isWall && closestNode2.wallweight==999999) continue;
        // If the closest node is at a distance of infinity,
        // we must be trapped and should therefore stop.
        if (closestNode2.distance === Infinity) return visitedNodesInOrder;
        closestNode2.endvisited = true;
        updateUnvisitedNeighborsEnd(closestNode2, grid,finishNode,heuristic,diagonalallowed,TempEnd,closestNode2.wallweight);
        visitedNodesInOrder.push(closestNode2);  
        //If intersection node is not found
        if(closestNode2 === startNode) 
          {
        //console.log("Hello");
          var temp1 = [closestNode2];
          visitedNodesInOrder.unshift(temp1)
          return visitedNodesInOrder;
          }
          //if intersection node is found we stop the search
          if (closestNode2.startvisited)
          {
          // console.log("Hi");
          var temp2 = [closestNode2];
          visitedNodesInOrder.unshift(temp2)
          return visitedNodesInOrder;
          }
    }
}
  //to sort the nodes by distance
  function sortNodesByDistance(unvisitedNodes) {
    unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
  }
  //To update the heuristic of unvisited neighbors starting from start node
  function updateUnvisitedNeighborsStart(node, grid,finishNode,heuristic,diagonalallowed,TempStart,wallweight) {
    const unvisitedNeighbors = getUnvisitedNeighbors(node, grid,diagonalallowed);
    for (const neighbor of unvisitedNeighbors) {
        if (neighbor.startvisited) continue ;
      var value; //here value variable will store the heuristic distance
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
      var temp= node.distance + wallweight*value; //adjusting the distance of the neighbor as nodes distance + penalty*heuristic
      neighbor.distance=temp; //penalty will be 1 if neighbor is not a weighted wall otherwise weighted wall will have a penalty
      neighbor.previousNode = node;
          neighbor.startvisited = true;
          TempStart.push(neighbor);
    }
  }
  //To update the heuristic of unvisited neighbors starting from end node
  function updateUnvisitedNeighborsEnd(node, grid,finishNode,heuristic,diagonalallowed,TempEnd,wallweight) {
    const unvisitedNeighbors = getUnvisitedNeighbors(node, grid,diagonalallowed);
    for (const neighbor of unvisitedNeighbors) {
        if (neighbor.endvisited) continue ;
      
      var value; //here value variable will store the heuristic distance
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
      var temp= node.distance + value*wallweight; //adjusting the distance of the neighbor as nodes distance + penalty*heuristic
      neighbor.distance=temp; //penalty will be 1 if neighbor is not a weighted wall otherwise weighted wall will have a penalty
      neighbor.next=node; 
    // neighbor.previousNode = closestNodeEnd;
     neighbor.endvisited = true; 
     TempEnd.push(neighbor);
    }
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
    return neighbors;
  }
  
  
  