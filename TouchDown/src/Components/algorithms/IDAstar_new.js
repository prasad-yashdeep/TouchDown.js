export function IDAstar(grid, startNode, finishNode,heuristic,diagonalallowed) {
    var depth=1;
    while(1) //infinite loop
    {
        
        var i=0;
        getAllNodes(grid);
        const visitedNodesInOrder = [];
        var unvisitedNodes = []
        startNode.distance = 0; //making the start node distance as 0
        unvisitedNodes.push(startNode);
        
        while(i<depth)
        {
            //DFS till depth level
            if(unvisitedNodes.length==0)
            {
                //console.log("Path not found");
                return visitedNodesInOrder;
            }
            //Sort nodes by distance
            sortNodesByDistance(unvisitedNodes);
            const closestNode = unvisitedNodes.shift(); //extract the shortest node
            if (closestNode.isWall && closestNode.wallweight==99999999) continue;
            // If the closest node is at a distance of infinity,
            // we must be trapped and should therefore stop.
            //extract the smallest node
            if (closestNode.distance === Infinity) return visitedNodesInOrder; //if the closestNode is infinity then we stop the search
            //if we reach the finishNode
            if(closestNode === finishNode)
            {
                visitedNodesInOrder.push(finishNode)
                return visitedNodesInOrder
            }    
            //console.log(closestNode);
            closestNode.isVisited=true;
            visitedNodesInOrder.push(closestNode);
            const unvisitedNeighbors = getUnvisitedNeighbors(closestNode, grid,diagonalallowed);
            
            for (const neighbor of unvisitedNeighbors) {
                var value; //value will have the heuristic distance
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
                neighbor.distance = value+closestNode.wallweight;
                neighbor.previousNode = closestNode; //closestNode will become the previousNode of neighbor
                neighbor.isVisited = true;//make the isVisited of neighbor node as true
                unvisitedNodes.push(neighbor);
                //if neighbor reaches finishNode
                if (neighbor === finishNode)
                { 
                    visitedNodesInOrder.push(finishNode);
                    return visitedNodesInOrder;
                }    
            }
            i=i+1;
            //increase i by 1 
            //i maintains the depth so far
        
        }
    depth=depth+1;
    //depth of DFS is increased by 1 everytime
    }
}
//get all nodes
function getAllNodes(grid) {
    for (const row of grid) {
      for (const node of row) {
        node.isVisited = false;
      }
    }
  }

  //get unvisited neighbors
  function getUnvisitedNeighbors(node, grid,diagonalallowed) {
    const neighbors = [];
    //console.log(node);
    const col=node.col;
    const row=node.row;
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
    return neighbors.filter(neighbor => !neighbor.isVisited);
  }
  //sort nodes by distance
  function sortNodesByDistance(unvisitedNodes) {
    unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
  }
  
  
  
