function isReachable(grid,r,c){
	if (-1 < r && -1 < c && r < grid.length && c <grid[0].length){
		if (!grid[r][c].isWall){
			return true
		}
	}
	return false
}
function getneighbors(grid, node) {
  var neighbors = [];
  var temp = [
    [-1, 0],
    [0, -1],
    [0, 1],
    [1, 0],
  ];
  for (var i = 0; i < 4; i++) {
    console.log(temp[i]);
    var r = node.row + temp[i][0];
    var c = node.col + temp[i][1];
    if (isReachable(grid, r, c)) {
      neighbors.push(grid[r][c]);
    }
  }
  return neighbors;
}
// function getneighbors(grid,node){
// 	var neighbors = []
//     var s0,s1,s2,s3,d0,d1,d2,d3;
// 	s0 = false
//     s1 = false
//     s2 = false
//     s3 = false
//     d0 = true
//     d1 = true
//     d2 = true
//     d3 = true
//     var x = node.row ;
//     var y = node.col;
//     if (isReachable(grid,x-1,y)){
//         neighbors.push(grid[x-1][y])
//         s0 = true
//     }
//     if (isReachable(grid,x,y+1)){
//         neighbors.push(grid[x][y+1])
//         s1 = true
//     }
//     if (isReachable(grid,x+1,y)){
//         neighbors.push(grid[x+1][y])
//         s2 = true
//     }
//     if (isReachable(grid,x,y-1)){
//         neighbors.push(grid[x][y-1])
//         s3 = true
//     }
//     if (d0 && isReachable(x-1,y-1)){
//         neighbors.push(grid[x-1][y-1])
//     }
//     if (d1 && isReachable(x-1,y+1)){
//         neighbors.push(grid[x-1][y+1])
//     }
//     if (d2 && isReachable(x+1,y+1)){
//         neighbors.push(grid[x+1][y+1])
//     }
//     if (d3 && isReachable(x+1,y-1)){
//         neighbors.push(grid[x+1][y-1])
//     }
// 	return neighbors
// }
function heuristic(a,b,h){
	if (h === 1){
        // Euclidean
       return Math.sqrt((b.row - a.row) ** 2 + (b.col - a.col) ** 2)
    }
    if (h === 2){
        // Manhattan
        return b.row - a.row + b.col - a.col
    }
    if (h === 3){
        // octile
        var a = Math.sqrt(2) - 1
        var dx = b.row - a.row 
        var dy = b.col - a.col
        return dx + dy + (a- 2)*Math.min(dx,dy)

    }
    if (h === 4){
        // chebyshev
        var dx = b.row - a.row 
        var dy = b.col - a.col
        return Math.max(dx,dy)
    }
}
var Heap = require('heap');
export function Orth_Astar(grid,startNode,finishNode,h){
	console.log(startNode)
	var openList = new Heap(function(nodeA, nodeB) {return nodeA.fscore - nodeB.fscore})
	startNode.gscore = 0 ;
	startNode.fscore = heuristic(startNode,finishNode,h) ; 
	openList.push(startNode);
    startNode.inopen = true;
    const visitedNodesInOrder = [];
    while (!openList.empty()) {
        var node = openList.pop();
        node.inclosed = true;
        visitedNodesInOrder.push(node)
        if (node === finishNode){
        	return visitedNodesInOrder;
        }
        var neighbors = getneighbors(grid,node)
        for (var i = 0; i<neighbors.length;i++){
        	var neighbor = neighbors[i];
        	if (neighbor.inclosed) {
                continue;
            }
            var r = neighbor.row; var c = neighbor.col ;
            var ng = node.gscore + 1
            if (!neighbor.inopen || ng < neighbor.gscore) {
                neighbor.gscore = ng;
                neighbor.hscore = heuristic(neighbor,finishNode,h);
                neighbor.fscore = neighbor.gscore + neighbor.hscore;
                neighbor.previousNode = node;

                if (!neighbor.inopen) {
                    openList.push(neighbor);
                    neighbor.inopen = true;
                } else {
                    openList.updateItem(neighbor);
                }
            }
        }
    }
    return visitedNodesInOrder
}
// export function Orth_Astar(grid,startNode,finishNode,h){
//     // console.log(startNode)
//     var startopenList = new Heap(function(nodeA, nodeB) {return nodeA.fscore - nodeB.fscore})
    
//     var endopenList = new Heap(function(nodeA, nodeB) {return nodeA.fscore - nodeB.fscore})
//     startNode.gscore = 0 ; finishNode.gscore = 0
//     startNode.fscore = 0 ; finishNode.fscore = 0
//     startopenList.push(startNode); endopenList.push(finishNode)
//     startNode.inopen = true; finishNode.inopen = true
//     const visitedNodesInOrder = [];
//     while (!startopenList.empty() && !endopenList.empty()) {
//         var node = startopenList.pop();
//         node.inclosed = true;
//         node.startvisited = true
//         visitedNodesInOrder.push(node)
//         if (node === finishNode){
//             var temp1 = [node];
//             console.log(1)
//             visitedNodesInOrder.unshift(temp1)
//             return visitedNodesInOrder;
//         }
//         var neighbors = getneighbors(grid,node)
//         for (var i = 0; i<neighbors.length;i++){
//             var neighbor = neighbors[i];
//             if (neighbor.endvisited){
//                 neighbor.previousNode = node
//                 var temp2 = [neighbor];
//                 console.log(2)
//                 visitedNodesInOrder.unshift(temp2)
//                 return visitedNodesInOrder;
//             }
//             if (!neighbor.inclosed) {
//                 var r = neighbor.row; var c = neighbor.col ;
//                 var ng = node.gscore + Math.sqrt((neighbor.row - node.row) ** 2 + (neighbor.col - node.col) ** 2)
//                 if (!neighbor.inopen || ng < neighbor.gscore) {
//                     neighbor.gscore = ng;
//                     neighbor.hscore = heuristic(neighbor,finishNode,h);
//                     neighbor.fscore = neighbor.gscore + neighbor.hscore;
//                     neighbor.previousNode = node;

//                     if (neighbor.endvisited){
//                         var temp3 = [neighbor];
//                         console.log(3)
//                         visitedNodesInOrder.unshift(temp3)

//                         return visitedNodesInOrder;
//                     }
//                     if (!neighbor.inopen) {
//                         startopenList.push(neighbor);
//                         neighbor.startvisited = true
//                         neighbor.inopen = true;
//                     } else {
//                         startopenList.updateItem(neighbor);
//                         neighbor.startvisited = true
//                     }
//                 }
//             }
//         }

//         var enode = endopenList.pop();
//         enode.inclosed = true;
//         enode.endvisited = true
//         visitedNodesInOrder.push(enode)
//         if (enode === startNode){
//             var temp4 = [enode];

//             console.log(4)
//             visitedNodesInOrder.unshift(temp4)
//             return visitedNodesInOrder;
//         }
//         var eneighbors = getneighbors(grid,enode)
//         for (var i = 0; i<eneighbors.length;i++){
//             var eneighbor = eneighbors[i];
//             if (eneighbor.startvisited){
//                 var temp5 = [eneighbor];
//                 eneighbor.nex = enode
//                 console.log(5)
//                 visitedNodesInOrder.unshift(temp5)
//                 return visitedNodesInOrder;
//             }
//             if (!eneighbor.inclosed) {
//                 var r = eneighbor.row; var c = eneighbor.col ;
//                 var ng = enode.gscore + Math.sqrt((eneighbor.row - enode.row) ** 2 + (eneighbor.col - enode.col) ** 2)
//                 if (!eneighbor.inopen || ng < eneighbor.gscore) {
//                     eneighbor.gscore = ng;
//                     eneighbor.hscore = heuristic(eneighbor,startNode,h);
//                     eneighbor.fscore = eneighbor.gscore + eneighbor.hscore;
//                     eneighbor.nex = enode;

//                     if (eneighbor.startvisited){
//                         var temp6 = [eneighbor];
//                         console.log(6)
//                         visitedNodesInOrder.unshift(temp6)

//                         return visitedNodesInOrder;
//                     }
//                     if (!eneighbor.inopen) {
//                         endopenList.push(eneighbor);
//                         eneighbor.endvisited = true
//                         eneighbor.inopen = true;
//                     } else {
//                         startopenList.updateItem(neighbor);
//                         eneighbor.endvisited = true
                        
//                     }
//                 }
//             }
//         }

//     }
//     return visitedNodesInOrder
// }






