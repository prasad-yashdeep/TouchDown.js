// function isReachable(grid,r,c){
//     if (-1 < r && -1 < c && r < grid.length && c <grid[0].length){
//         if (!grid[r][c].isWall){
//             return true
//         }
//     }
//     return false
// }
// function heuristic(a,b,h){
//     if (h === 1){
//         // Euclidean
//        return Math.sqrt((b.row - a.row) ** 2 + (b.col - a.col) ** 2)
//     }
//     if (h === 2){
//         // Manhattan
//         return b.row - a.row + b.col - a.col
//     }
//     if (h === 3){
//         // octile
//         var a = Math.sqrt(2) - 1
//         var dx = b.row - a.row
//         var dy = b.col - a.col
//         return dx + dy + (a- 2)*Math.min(dx,dy)

//     }
//     if (h === 4){
//         // chebyshev
//         var dx = b.row - a.row
//         var dy = b.col - a.col
//         return Math.max(dx,dy)
//     }
// }
// var Heap = require('heap');
// export function BiAstar(grid,startNode,finishNode,h){
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

function isReachable(grid, r, c) {
  if (-1 < r && -1 < c && r < grid.length && c < grid[0].length) {
    if (!grid[r][c].isWall) {
      return true;
    }
  }
  return false;
}
function getneighbors(grid, node, diagonalallowed) {
  var neighbors = [];
  console.log(diagonalallowed);
  // else{
  var temp = [
    [-1, 0],
    [0, -1],
    [0, 1],
    [1, 0],
  ];
  // }
  if (diagonalallowed) {
    temp.push([-1, -1]);
    temp.push([1, -1]);
    temp.push([1, 1]);
    temp.push([-1, 1]);
  }
  for (var i = 0; i < temp.length; i++) {
    var r = node.row + temp[i][0];
    var c = node.col + temp[i][1];
    if (isReachable(grid, r, c)) {
      neighbors.push(grid[r][c]);
    }
  }
  return neighbors;
}
function heuristic(a, b) {
  return Math.sqrt((b.row - a.row) ** 2 + (b.col - a.col) ** 2);
}
var Heap = require("heap");

export function BiAstar(grid, startNode, finishNode, h, diagonalallowed) {
  // console.log(startNode)
  var startopenList = new Heap(function (nodeA, nodeB) {
    return nodeA.fscore - nodeB.fscore;
  });

  var endopenList = new Heap(function (nodeA, nodeB) {
    return nodeA.fscore - nodeB.fscore;
  });
  startNode.gscore = 0;
  finishNode.gscore = 0;
  startNode.fscore = 0;
  finishNode.fscore = 0;
  startopenList.push(startNode);
  endopenList.push(finishNode);
  startNode.inopen = true;
  finishNode.inopen = true;
  const visitedNodesInOrder = [];
  while (!startopenList.empty() && !endopenList.empty()) {
    var node = startopenList.pop();
    node.inclosed = true;
    node.startvisited = true;
    visitedNodesInOrder.push(node);
    if (node === finishNode) {
      var temp1 = [node];
      console.log(1);
      visitedNodesInOrder.unshift(temp1);
      return visitedNodesInOrder;
    }
    var neighbors = getneighbors(grid, node, diagonalallowed);
    for (var i = 0; i < neighbors.length; i++) {
      var neighbor = neighbors[i];
      if (neighbor.endvisited) {
        neighbor.previousNode = node;
        var temp2 = [neighbor];
        console.log(2);
        visitedNodesInOrder.unshift(temp2);
        return visitedNodesInOrder;
      }
      if (!neighbor.inclosed) {
        var r = neighbor.row;
        var c = neighbor.col;
        var ng =
          node.gscore +
          Math.sqrt(
            (neighbor.row - node.row) ** 2 + (neighbor.col - node.col) ** 2
          );
        if (!neighbor.inopen || ng < neighbor.gscore) {
          neighbor.gscore = ng;
          neighbor.hscore = heuristic(neighbor, finishNode, h);
          neighbor.fscore = neighbor.gscore + neighbor.hscore;
          neighbor.previousNode = node;

          if (neighbor.endvisited) {
            var temp3 = [neighbor];
            console.log(3);
            visitedNodesInOrder.unshift(temp3);

            return visitedNodesInOrder;
          }
          if (!neighbor.inopen) {
            startopenList.push(neighbor);
            neighbor.startvisited = true;
            neighbor.inopen = true;
          } else {
            startopenList.updateItem(neighbor);
            neighbor.startvisited = true;
          }
        }
      }
    }

    var enode = endopenList.pop();
    enode.inclosed = true;
    enode.endvisited = true;
    visitedNodesInOrder.push(enode);
    if (enode === startNode) {
      var temp4 = [enode];

      console.log(4);
      visitedNodesInOrder.unshift(temp4);
      return visitedNodesInOrder;
    }
    var eneighbors = getneighbors(grid, enode, diagonalallowed);
    for (var i = 0; i < eneighbors.length; i++) {
      var eneighbor = eneighbors[i];
      if (eneighbor.startvisited) {
        var temp5 = [eneighbor];
        eneighbor.nex = enode;
        console.log(5);
        visitedNodesInOrder.unshift(temp5);
        return visitedNodesInOrder;
      }
      if (!eneighbor.inclosed) {
        var r = eneighbor.row;
        var c = eneighbor.col;
        var ng =
          enode.gscore +
          Math.sqrt(
            (eneighbor.row - enode.row) ** 2 + (eneighbor.col - enode.col) ** 2
          );
        if (!eneighbor.inopen || ng < eneighbor.gscore) {
          eneighbor.gscore = ng;
          eneighbor.hscore = heuristic(eneighbor, startNode, h);
          eneighbor.fscore = eneighbor.gscore + eneighbor.hscore;
          eneighbor.nex = enode;

          if (eneighbor.startvisited) {
            var temp6 = [eneighbor];
            console.log(6);
            visitedNodesInOrder.unshift(temp6);

            return visitedNodesInOrder;
          }
          if (!eneighbor.inopen) {
            endopenList.push(eneighbor);
            eneighbor.endvisited = true;
            eneighbor.inopen = true;
          } else {
            startopenList.updateItem(neighbor);
            eneighbor.endvisited = true;
          }
        }
      }
    }
  }
  return visitedNodesInOrder;
}
