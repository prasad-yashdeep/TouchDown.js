//import React, { Component } from "react";
import React, { Component } from "react";
import { Astar } from "../algorithms/astar";
import { Bestfs } from "../algorithms/Bestfs";
import { bfs } from "../algorithms/bfs";
import { bidfsans, bidijkstra } from "../algorithms/bi-dijkstra";
import { BiAstar } from "../algorithms/biastar";
import { BiBestfs } from "../algorithms/BiBestfs";
import { bbfs, bibfsans } from "../algorithms/bibfs";
import { BiIastar } from "../algorithms/BiIastar";
import { dijkstra, getNodesInShortestPathOrder } from "../algorithms/dijkstra";
import { Iastar } from "../algorithms/Iastar";
import { IBestfs } from "../algorithms/IBestfs";
import { IDAstar } from "../algorithms/IDAstar_new";
import { jps, jpsans } from "../algorithms/jps";
import { orthJPS, orthogonalans } from "../algorithms/orthJPS";
import img1 from "../images/marsmap1k.jpg";
import Node from "./Node";
import "./PathfindingVisualizer.css";

const t_rows = 20;
const t_cols = 50;

export default class PathfindingVisualizer extends Component {
  constructor() {
    super();
    this.state = {
      grid: [],
      wallweight: 99999999,
      mouseIsPressed: false,
      fin: false,
      inf: false,
      pause: false,
      heuristic: 1, //
      heuristicname: "Euclidean",
      startnoderow: 4,
      startnodecol: 17,
      finishnoderow: 10,
      finishnodecol: 38,
    };
    this.handleheuristic1 = this.handleheuristic1.bind(this);
    this.handleheuristic2 = this.handleheuristic2.bind(this);
    this.handleheuristic3 = this.handleheuristic3.bind(this);
    this.handleheuristic4 = this.handleheuristic4.bind(this);
    this.handleOptionChangefinite = this.handleOptionChangefinite.bind(this);
    this.handleOptionChangeinfinite = this.handleOptionChangeinfinite.bind(
      this
    );
    // this.handleCheckfinite = this.handleCheckfinite.bind(this);
    this.handleChange2 = this.handleChange2.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleheuristic1(event) {
    this.state.heuristic = 1;
    this.state.heuristicname = "Euclidean";
  }
  handleheuristic2(event) {
    this.state.heuristic = 2;
    this.state.heuristicname = "Manhattan";
  }
  handleheuristic3(event) {
    this.state.heuristic = 3;
    this.state.heuristicname = "Octile";
  }
  handleheuristic4(event) {
    this.state.heuristic = 4;
    this.state.heuristicname = "Chebyshev";
  }

  handleOptionChangefinite(event) {
    if (!this.state.fin) {
      this.state.fin = true;
      this.state.wallweight = parseInt(
        prompt("Please enter the value of wall weight")
      );
      if (!this.state.wallweight) {
        this.state.wallweight = 99999999;
      }
    }

    //console.log(this.state.wallweight);
  }
  handleOptionChangeinfinite(event) {
    if (this.state.fin) {
      this.state.fin = false;
      this.state.wallweight = 99999999;
    }
    //console.log(this.state.wallweight);
  }
  handleChange2(event) {
    //console.log("getting weighted wall");
    this.setState({ wallweight: event.target.value });
  }
  handleSubmit(event) {
    alert("A name was submitted: " + this.state.wallweight);
    event.preventDefault();
  }
  componentDidMount() {
    const grid = getInitialGrid(
      this.state.startnoderow,
      this.state.startnodecol,
      this.state.finishnoderow,
      this.state.finishnodecol
    );
    this.setState({ grid });
    console.log("component has mounted");
    document.body.style.backgroundImage = `url(${img1})`;
  }

  handleMouseDown(row, col) {
    const newGrid = getNewGridWithWallToggled(
      this.state.grid,
      row,
      col,
      this.state.wallweight,
      this.state.fin
    );
    this.setState({ grid: newGrid, mouseIsPressed: true });
  }

  handleMouseEnter(row, col) {
    if (!this.state.mouseIsPressed) return;
    const newGrid = getNewGridWithWallToggled(
      this.state.grid,
      row,
      col,
      this.state.wallweight,
      this.state.fin
    );
    this.setState({ grid: newGrid });
  }

  handleonDragDrop = (e) => {
    let row_i = e.dataTransfer.getData("row");
    let col_i = e.dataTransfer.getData("col");
    let row_f = e.target.getAttribute("rowdata");
    let col_f = e.target.getAttribute("coldata");
    let checkStart = e.dataTransfer.getData("infos");
    let checkFinish = e.dataTransfer.getData("infof");
    console.log(row_i, col_i, row_f, col_f, checkStart, checkFinish);
    console.log(e.target);
    const newGrid = newStartPositions(
      this.state.grid,
      row_i,
      col_i,
      row_f,
      col_f,
      checkStart,
      checkFinish
    );
    console.log(checkStart, checkFinish);
    this.setState({ grid: newGrid });
    if (checkStart == "true" && checkFinish == "false") {
      console.log("start is true");
      this.setState({ startnoderow: row_f });
      this.setState({ startnodecol: col_f });
    } else if (checkFinish == "true" && checkStart == "false") {
      console.log("finish is true");
      this.setState({ finishnoderow: row_f });
      this.setState({ finishnodecol: col_f });
    }

    //const col_i = id[]
    //console.log(e.target);
  };

  handleMouseUp() {
    this.setState({ mouseIsPressed: false });
  }

  handleonDragStart = (e, isStart, isFinish) => {
    let r = e.target.getAttribute("rowdata");
    let c = e.target.getAttribute("coldata");
    let s = isStart;
    let f = isFinish;
    e.dataTransfer.setData("data", `${e.target.id}`);
    e.dataTransfer.setData("row", `${r}`);
    e.dataTransfer.setData("col", `${c}`);
    e.dataTransfer.setData("infos", `${s}`);
    e.dataTransfer.setData("infof", `${f}`);
    console.log(e.target);
    //event.dataTransfer.setData("taskName", );
  };
  // onDragOver = (event) => {
  //   event.preventDefault();
  // };

  animate(visitedNodesInOrder, nodesInShortestPathOrder) {
    for (let i = 1; i <= visitedNodesInOrder.length; i++) {
      //console.log(this.state.pause);

      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          this.animateShortestPath(nodesInShortestPathOrder);
        }, 10 * i);
        return;
      }

      if (
        visitedNodesInOrder[i].isWall == false &&
        visitedNodesInOrder[i].isWallweight == false
      ) {
        setTimeout(() => {
          const node = visitedNodesInOrder[i];
          if (!node.isStart && !node.isFinish) {
            document.getElementById(`node-${node.row}-${node.col}`).className =
              "node node-visited";
          }
        }, 10 * i);
      }
    }
  }

  animateShortestPath(nodesInShortestPathOrder) {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        if (node.isStart) {
          document.getElementById(`node-${node.row}-${node.col}`).className =
            "node node-start";
        }
        if (!node.isStart && !node.isFinish) {
          document.getElementById(`node-${node.row}-${node.col}`).className =
            "node node-shortest-path";
        }
        if (node.isFinish) {
          document.getElementById(`node-${node.row}-${node.col}`).className =
            "node node-finish";
        }
      }, 50 * i);
    }
  }
  visualizeOrthAstar() {
    const { grid } = this.state;
    const startNode = grid[this.state.startnoderow][this.state.startnodecol];
    const finishNode = grid[this.state.finishnoderow][this.state.finishnodecol];
    const visitedNodesInOrder = Astar(
      grid,
      startNode,
      finishNode,
      this.state.heuristic,
      false
    );
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    this.animate(visitedNodesInOrder, nodesInShortestPathOrder);
  }
  visualizeAstar() {
    const { grid } = this.state;
    const startNode = grid[this.state.startnoderow][this.state.startnodecol];
    const finishNode = grid[this.state.finishnoderow][this.state.finishnodecol];
    const visitedNodesInOrder = Astar(
      grid,
      startNode,
      finishNode,
      this.state.heuristic,
      true
    );
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    this.animate(visitedNodesInOrder, nodesInShortestPathOrder);
  }
  visualizeBiAstarWithDiagonals() {
    const { grid } = this.state;
    const startNode = grid[this.state.startnoderow][this.state.startnodecol];
    const finishNode = grid[this.state.finishnoderow][this.state.finishnodecol];
    const visitedNodesInOrder = BiAstar(
      grid,
      startNode,
      finishNode,
      this.state.heuristic,
      true
    );
    const n = visitedNodesInOrder.shift();
    //console.log(n[0].nex);
    //console.log(n[0].previousNode);
    const nodesInShortestPathOrder = bibfsans(n[0]);
    this.animate(visitedNodesInOrder, nodesInShortestPathOrder);
  }
  visualizeBiAstarNodiagoanls() {
    const { grid } = this.state;
    const startNode = grid[this.state.startnoderow][this.state.startnodecol];
    const finishNode = grid[this.state.finishnoderow][this.state.finishnodecol];
    const visitedNodesInOrder = BiAstar(
      grid,
      startNode,
      finishNode,
      this.state.heuristic,
      false
    );
    const n = visitedNodesInOrder.shift();
    //console.log(n[0].nex);
    //console.log(n[0].previousNode);
    const nodesInShortestPathOrder = bibfsans(n[0]);
    this.animate(visitedNodesInOrder, nodesInShortestPathOrder);
  }
  visualizeJPS() {
    const { grid } = this.state;
    const startNode = grid[this.state.startnoderow][this.state.startnodecol];
    const finishNode = grid[this.state.finishnoderow][this.state.finishnodecol];
    const visitedNodesInOrder = jps(
      grid,
      startNode,
      finishNode,
      this.state.heuristic
    );
    const nodesInShortestPathOrder = jpsans(finishNode, grid);
    this.animate(visitedNodesInOrder, nodesInShortestPathOrder);
  }
  visualizeBFS() {
    //console.log(this.state.wallweight);
    const { grid } = this.state;
    const startNode = grid[this.state.startnoderow][this.state.startnodecol];
    const finishNode = grid[this.state.finishnoderow][this.state.finishnodecol];
    const visitedNodesInOrder = bfs(grid, startNode, finishNode, false);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    this.animate(visitedNodesInOrder, nodesInShortestPathOrder);
  }
  visualizeBBFS() {
    const { grid } = this.state;
    const startNode = grid[this.state.startnoderow][this.state.startnodecol];
    const finishNode = grid[this.state.finishnoderow][this.state.finishnodecol];
    const visitedNodesInOrder = bbfs(grid, startNode, finishNode, false);
    const n = visitedNodesInOrder.shift();
    //const nodesInShortestPathOrder = getNodesInShortestPathOrder(n[0]);
    const nodesInShortestPathOrder = bibfsans(n[0]);
    this.animate(visitedNodesInOrder, nodesInShortestPathOrder);
  }
  visualizeBDBFS() {
    const { grid } = this.state;
    const startNode = grid[this.state.startnoderow][this.state.startnodecol];
    const finishNode = grid[this.state.finishnoderow][this.state.finishnodecol];
    const visitedNodesInOrder = bbfs(grid, startNode, finishNode, true);
    const n = visitedNodesInOrder.shift();
    //const nodesInShortestPathOrder = getNodesInShortestPathOrder(n[0]);
    const nodesInShortestPathOrder = bibfsans(n[0]);
    this.animate(visitedNodesInOrder, nodesInShortestPathOrder);
  }
  visualizeBFSwithdiagonals() {
    const { grid } = this.state;
    const startNode = grid[this.state.startnoderow][this.state.startnodecol];
    const finishNode = grid[this.state.finishnoderow][this.state.finishnodecol];
    const visitedNodesInOrder = bfs(grid, startNode, finishNode, true);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    this.animate(visitedNodesInOrder, nodesInShortestPathOrder);
  }
  visualizeOrthJPS() {
    const { grid } = this.state;
    const startNode = grid[this.state.startnoderow][this.state.startnodecol];
    const finishNode = grid[this.state.finishnoderow][this.state.finishnodecol];
    const visitedNodesInOrder = orthJPS(
      grid,
      startNode,
      finishNode,
      this.state.heuristic
    );
    const nodesInShortestPathOrder = orthogonalans(finishNode, grid);
    this.animate(visitedNodesInOrder, nodesInShortestPathOrder);
  }

  //shreeya
  visualizeDijkstra() {
    const { grid } = this.state;
    const startNode = grid[this.state.startnoderow][this.state.startnodecol];
    const finishNode = grid[this.state.finishnoderow][this.state.finishnodecol];
    var diagonalallowed = false;
    const visitedNodesInOrder = dijkstra(
      grid,
      startNode,
      finishNode,
      diagonalallowed
    );
    if (visitedNodesInOrder) {
      const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
      //console.log(visitedNodesInOrder);
      //console.log(nodesInShortestPathOrder);
      this.animate(visitedNodesInOrder, nodesInShortestPathOrder);
    } else {
      //console.log("Path Blocked");
    }
  }
  visualizeIntelligentAstar() {
    const { grid } = this.state;
    const startNode = grid[this.state.startnoderow][this.state.startnodecol];
    const finishNode = grid[this.state.finishnoderow][this.state.finishnodecol];
    var heuristic = this.state.heuristicname;
    var diagonalallowed = false;
    const visitedNodesInOrder = Iastar(
      grid,
      startNode,
      finishNode,
      heuristic,
      diagonalallowed
    );
    if (visitedNodesInOrder) {
      const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
      //console.log(visitedNodesInOrder);
      //console.log(nodesInShortestPathOrder);
      this.animate(visitedNodesInOrder, nodesInShortestPathOrder);
    } else {
      //console.log("Path Blocked");
    }
  }
  visualizeBiIntelligentAstar() {
    const { grid } = this.state;
    const startNode = grid[this.state.startnoderow][this.state.startnodecol];
    const finishNode = grid[this.state.finishnoderow][this.state.finishnodecol];
    var heuristic = this.state.heuristicname;
    var diagonalallowed = false;
    const visitedNodesInOrder = BiIastar(
      grid,
      startNode,
      finishNode,
      heuristic,
      diagonalallowed
    );
    if (visitedNodesInOrder) {
      //console.log(visitedNodesInOrder);
      const ans = visitedNodesInOrder.shift();
      //console.log(ans);
      //console.log(ans[0]);
      const tempo = grid[ans[0].row][ans[0].col];
      const nodesInShortestPathOrder = bidfsans(tempo);
      this.animate(visitedNodesInOrder, nodesInShortestPathOrder);
    } else {
      //console.log("Path Blocked");
    }
  }
  visualizeBestfs() {
    const { grid } = this.state;
    const startNode = grid[this.state.startnoderow][this.state.startnodecol];
    const finishNode = grid[this.state.finishnoderow][this.state.finishnodecol];
    var heuristic = "Diagonal";
    var diagonalallowed = false;
    const visitedNodesInOrder = Bestfs(
      grid,
      startNode,
      finishNode,
      heuristic,
      diagonalallowed
    );
    if (visitedNodesInOrder) {
      const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
      //console.log(visitedNodesInOrder);
      //console.log(nodesInShortestPathOrder);
      this.animate(visitedNodesInOrder, nodesInShortestPathOrder);
    } else {
      //console.log("Path Blocked");
    }
  }
  visualizeIBestfs() {
    const { grid } = this.state;
    const startNode = grid[this.state.startnoderow][this.state.startnodecol];
    const finishNode = grid[this.state.finishnoderow][this.state.finishnodecol];
    var heuristic = "Diagonal";
    var diagonalallowed = false;
    const visitedNodesInOrder = IBestfs(
      grid,
      startNode,
      finishNode,
      heuristic,
      diagonalallowed
    );
    if (visitedNodesInOrder) {
      const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
      //console.log(visitedNodesInOrder);
      //console.log(nodesInShortestPathOrder);
      this.animate(visitedNodesInOrder, nodesInShortestPathOrder);
    } else {
      //console.log("Path Blocked");
    }
  }
  visualizeBiDijkstra() {
    const { grid } = this.state;
    const startNode = grid[this.state.startnoderow][this.state.startnodecol];
    const finishNode = grid[this.state.finishnoderow][this.state.finishnodecol];
    var diagonalallowed = false;
    const visitedNodesInOrder = bidijkstra(
      grid,
      startNode,
      finishNode,
      diagonalallowed
    );
    if (visitedNodesInOrder) {
      //console.log(visitedNodesInOrder);
      const ans = visitedNodesInOrder.shift();
      //console.log(ans);
      //console.log(ans[0]);
      const tempo = grid[ans[0].row][ans[0].col];
      const nodesInShortestPathOrder = bidfsans(tempo);
      this.animate(visitedNodesInOrder, nodesInShortestPathOrder);
    } else {
      //console.log("Path Blocked");
    }
  }

  visualizeBiBestfs() {
    const { grid } = this.state;
    const startNode = grid[this.state.startnoderow][this.state.startnodecol];
    const finishNode = grid[this.state.finishnoderow][this.state.finishnodecol];
    var heuristic = this.state.heuristicname;
    var diagonalallowed = false;
    const visitedNodesInOrder = BiBestfs(
      grid,
      startNode,
      finishNode,
      heuristic,
      diagonalallowed
    );
    if (visitedNodesInOrder) {
      //console.log(visitedNodesInOrder);
      const ans = visitedNodesInOrder.shift();
      //console.log(ans);
      //console.log(ans[0]);
      const tempo = grid[ans[0].row][ans[0].col];
      const nodesInShortestPathOrder = bidfsans(tempo);
      this.animate(visitedNodesInOrder, nodesInShortestPathOrder);
    } else {
      //console.log("Path Blocked");
    }
  }
  visualizeIDAstar() {
    const { grid } = this.state;
    const startNode = grid[this.state.startnoderow][this.state.startnodecol];
    const finishNode = grid[this.state.finishnoderow][this.state.finishnodecol];
    var heuristic = this.state.heuristicname;
    var diagonalallowed = false;
    const visitedNodesInOrder = IDAstar(
      grid,
      startNode,
      finishNode,
      heuristic,
      diagonalallowed
    );
    if (visitedNodesInOrder) {
      const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
      //console.log(visitedNodesInOrder);
      //console.log(nodesInShortestPathOrder);
      this.animate(visitedNodesInOrder, nodesInShortestPathOrder);
    } else {
      //console.log("Path Blocked");
    }
  }
  visualizeDijkstraDiag() {
    const { grid } = this.state;
    const startNode = grid[this.state.startnoderow][this.state.startnodecol];
    const finishNode = grid[this.state.finishnoderow][this.state.finishnodecol];
    var diagonalallowed = true;
    const visitedNodesInOrder = dijkstra(
      grid,
      startNode,
      finishNode,
      diagonalallowed
    );
    if (visitedNodesInOrder) {
      const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
      //console.log(visitedNodesInOrder);
      //console.log(nodesInShortestPathOrder);
      this.animate(visitedNodesInOrder, nodesInShortestPathOrder);
    } else {
      //console.log("Path Blocked");
    }
  }
  visualizeIntelligentAstarDiag() {
    const { grid } = this.state;
    const startNode = grid[this.state.startnoderow][this.state.startnodecol];
    const finishNode = grid[this.state.finishnoderow][this.state.finishnodecol];
    var heuristic = this.state.heuristicname;
    var diagonalallowed = true;
    const visitedNodesInOrder = Iastar(
      grid,
      startNode,
      finishNode,
      heuristic,
      diagonalallowed
    );
    if (visitedNodesInOrder) {
      const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
      //console.log(visitedNodesInOrder);
      //console.log(nodesInShortestPathOrder);
      this.animate(visitedNodesInOrder, nodesInShortestPathOrder);
    } else {
      //console.log("Path Blocked");
    }
  }
  visualizeBiIntelligentAstarDiag() {
    const { grid } = this.state;
    const startNode = grid[this.state.startnoderow][this.state.startnodecol];
    const finishNode = grid[this.state.finishnoderow][this.state.finishnodecol];
    var heuristic = this.state.heuristicname;
    var diagonalallowed = true;
    const visitedNodesInOrder = BiIastar(
      grid,
      startNode,
      finishNode,
      heuristic,
      diagonalallowed
    );
    if (visitedNodesInOrder) {
      //console.log(visitedNodesInOrder);
      const ans = visitedNodesInOrder.shift();
      //console.log(ans);
      //console.log(ans[0]);
      const tempo = grid[ans[0].row][ans[0].col];
      const nodesInShortestPathOrder = bidfsans(tempo);
      this.animate(visitedNodesInOrder, nodesInShortestPathOrder);
    } else {
      //console.log("Path Blocked");
    }
  }
  visualizeBestfsDiag() {
    const { grid } = this.state;
    const startNode = grid[this.state.startnoderow][this.state.startnodecol];
    const finishNode = grid[this.state.finishnoderow][this.state.finishnodecol];
    var heuristic = "Diagonal";
    var diagonalallowed = true;
    const visitedNodesInOrder = Bestfs(
      grid,
      startNode,
      finishNode,
      heuristic,
      diagonalallowed
    );
    if (visitedNodesInOrder) {
      const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
      //console.log(visitedNodesInOrder);
      //console.log(nodesInShortestPathOrder);
      this.animate(visitedNodesInOrder, nodesInShortestPathOrder);
    } else {
      //console.log("Path Blocked");
    }
  }
  visualizeIBestfsDiag() {
    const { grid } = this.state;
    const startNode = grid[this.state.startnoderow][this.state.startnodecol];
    const finishNode = grid[this.state.finishnoderow][this.state.finishnodecol];
    var heuristic = "Diagonal";
    var diagonalallowed = true;
    const visitedNodesInOrder = IBestfs(
      grid,
      startNode,
      finishNode,
      heuristic,
      diagonalallowed
    );
    if (visitedNodesInOrder) {
      const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
      //console.log(visitedNodesInOrder);
      //console.log(nodesInShortestPathOrder);
      this.animate(visitedNodesInOrder, nodesInShortestPathOrder);
    } else {
      //console.log("Path Blocked");
    }
  }
  visualizeBiDijkstraDiag() {
    const { grid } = this.state;
    const startNode = grid[this.state.startnoderow][this.state.startnodecol];
    const finishNode = grid[this.state.finishnoderow][this.state.finishnodecol];
    var diagonalallowed = true;
    const visitedNodesInOrder = bidijkstra(
      grid,
      startNode,
      finishNode,
      diagonalallowed
    );
    if (visitedNodesInOrder) {
      //console.log(visitedNodesInOrder);
      const ans = visitedNodesInOrder.shift();
      //console.log(ans);
      //console.log(ans[0]);
      const tempo = grid[ans[0].row][ans[0].col];
      const nodesInShortestPathOrder = bidfsans(tempo);
      this.animate(visitedNodesInOrder, nodesInShortestPathOrder);
    } else {
      //console.log("Path Blocked");
    }
  }

  visualizeBiBestfsDiag() {
    const { grid } = this.state;
    const startNode = grid[this.state.startnoderow][this.state.startnodecol];
    const finishNode = grid[this.state.finishnoderow][this.state.finishnodecol];
    var heuristic = this.state.heuristicname;
    var diagonalallowed = true;
    const visitedNodesInOrder = BiBestfs(
      grid,
      startNode,
      finishNode,
      heuristic,
      diagonalallowed
    );
    if (visitedNodesInOrder) {
      //console.log(visitedNodesInOrder);
      const ans = visitedNodesInOrder.shift();
      //console.log(ans);
      //console.log(ans[0]);
      const tempo = grid[ans[0].row][ans[0].col];
      const nodesInShortestPathOrder = bidfsans(tempo);
      this.animate(visitedNodesInOrder, nodesInShortestPathOrder);
    } else {
      //console.log("Path Blocked");
    }
  }
  visualizeIDAstarDiag() {
    const { grid } = this.state;
    console.log(this.state.heuristicname);
    const startNode = grid[this.state.startnoderow][this.state.startnodecol];
    const finishNode = grid[this.state.finishnoderow][this.state.finishnodecol];
    var heuristic = this.state.heuristicname;
    var diagonalallowed = true;
    const visitedNodesInOrder = IDAstar(
      grid,
      startNode,
      finishNode,
      heuristic,
      diagonalallowed
    );
    if (visitedNodesInOrder) {
      const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
      //console.log(visitedNodesInOrder);
      //console.log(nodesInShortestPathOrder);
      this.animate(visitedNodesInOrder, nodesInShortestPathOrder);
    } else {
      //console.log("Path Blocked");
    }
  }
  clearwall() {
    const grid1 = this.state.grid;
    for (let row = 0; row < t_rows; row++) {
      for (let col = 0; col < t_cols; col++) {
        const node = grid1[row][col];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          "node node";
      }
    }

    const node = grid1[this.state.startnoderow][this.state.startnodecol];
    document.getElementById(`node-${node.row}-${node.col}`).className =
      "node node-start";
    const node1 = grid1[this.state.finishnoderow][this.state.finishnodecol];
    document.getElementById(`node-${node1.row}-${node1.col}`).className =
      "node node-finish";
    const grid = getInitialGrid(
      this.state.startnoderow,
      this.state.startnodecol,
      this.state.finishnoderow,
      this.state.finishnodecol
    );
    this.setState({ grid });
  }

  pauseSearch() {
    let bool1 = this.state.pause;
    bool1 = true;
    this.setState({ pause: bool1 });
  }

  clearPath() {
    //console.log("calling clear path");
    const grid1 = this.state.grid;

    for (let row = 0; row < t_rows; row++) {
      for (let col = 0; col < t_cols; col++) {
        let node = grid1[row][col];

        if (!node.isWall && !node.isWallweight) {
          document.getElementById(`node-${node.row}-${node.col}`).className =
            "node node";
        } else if (node.isWallweight) {
          document.getElementById(`node-${node.row}-${node.col}`).className =
            "node node-wallweight";
        }
        node.distance = Infinity;
        node.previousNode = null;
        node.next = null;
        node.nex = null;
        node.gscore = Infinity;
        node.hscore = Infinity;
        node.fscore = Infinity;
        node.inclosed = false;
        node.inopen = false;
        node.startvisited = false;
        node.endvisited = false;
        node.isVisited = false;
      }
    }
    const node = grid1[this.state.startnoderow][this.state.startnodecol];
    document.getElementById(`node-${node.row}-${node.col}`).className =
      "node node-start";
    const node1 = grid1[this.state.finishnoderow][this.state.finishnodecol];
    document.getElementById(`node-${node1.row}-${node1.col}`).className =
      "node node-finish";
  }

  render() {
    const { grid, mouseIsPressed } = this.state;

    return (
      <>
        <div className="button-wrapper2">
          <div className="button2">SELECT ALGORITHM</div>

          <form id="app-cover">
            <div id="select-box">
              <input type="checkbox" id="options-view-button" value="ALGO" />

              <div class="mybutton">
                <a>Dijkstra Algorithm</a>
              </div>

              <div id="options">
                <div onClick={() => this.visualizeDijkstra()} class="option">
                  <input
                    class="s-c top"
                    type="radio"
                    name="platform"
                    value="codepen"
                  />
                  <span class="label">Dijkstra</span>
                </div>

                <div onClick={() => this.visualizeBiDijkstra()} class="option">
                  <input
                    class="s-c top"
                    type="radio"
                    name="platform"
                    value="dribbble"
                  />
                  <span class="label">Bi-directional</span>
                </div>

                <div
                  onClick={() => this.visualizeDijkstraDiag()}
                  class="option"
                >
                  <input
                    class="s-c top"
                    type="radio"
                    name="platform"
                    value="behance"
                  />
                  <input
                    class="s-c bottom"
                    type="radio"
                    name="platform"
                    value="behance"
                  />
                  <span class="label">Diagonal</span>
                </div>

                <div
                  onClick={() => this.visualizeBiDijkstraDiag()}
                  class="option"
                >
                  <input
                    class="s-c top"
                    type="radio"
                    name="platform"
                    value="hackerrank"
                  />
                  <span class="label">BiDir+diagonal</span>
                </div>

                <div id="option-bg"></div>
              </div>
            </div>
          </form>

          <form id="app-cover">
            <div id="select-box">
              <input type="checkbox" id="options-view-button" value="ALGO" />

              <div class="mybutton">
                <a>BFS Algorithm</a>
              </div>

              <div id="options">
                <div onClick={() => this.visualizeBFS()} class="option">
                  <input
                    class="s-c top"
                    type="radio"
                    name="platform"
                    value="codepen"
                  />
                  <span class="label">BFS</span>
                </div>

                <div onClick={() => this.visualizeBBFS()} class="option">
                  <input
                    class="s-c top"
                    type="radio"
                    name="platform"
                    value="dribbble"
                  />
                  <span class="label">Bi-directional</span>
                </div>

                <div
                  onClick={() => this.visualizeBFSwithdiagonals()}
                  class="option"
                >
                  <input
                    class="s-c top"
                    type="radio"
                    name="platform"
                    value="behance"
                  />
                  <input
                    class="s-c bottom"
                    type="radio"
                    name="platform"
                    value="behance"
                  />
                  <span class="label">Diagonal</span>
                </div>

                <div onClick={() => this.visualizeBDBFS()} class="option">
                  <input
                    class="s-c top"
                    type="radio"
                    name="platform"
                    value="hackerrank"
                  />
                  <span class="label">BiDir+diagonal</span>
                </div>

                <div id="option-bg"></div>
              </div>
            </div>
          </form>

          <form id="app-cover">
            <div id="select-box">
              <input type="checkbox" id="options-view-button" value="ALGO" />

              <div class="mybutton">
                <a>Intelligent A-Star Algorithm</a>
              </div>

              <div id="options">
                <div
                  onClick={() => this.visualizeIntelligentAstar()}
                  class="option"
                >
                  <input
                    class="s-c top"
                    type="radio"
                    name="platform"
                    value="codepen"
                  />
                  <span class="label">Int. A-Star</span>
                </div>

                <div
                  onClick={() => this.visualizeBiIntelligentAstar()}
                  class="option"
                >
                  <input
                    class="s-c top"
                    type="radio"
                    name="platform"
                    value="dribbble"
                  />
                  <span class="label">Bi-directional</span>
                </div>

                <div
                  onClick={() => this.visualizeIntelligentAstarDiag()}
                  class="option"
                >
                  <input
                    class="s-c top"
                    type="radio"
                    name="platform"
                    value="behance"
                  />
                  <input
                    class="s-c bottom"
                    type="radio"
                    name="platform"
                    value="behance"
                  />
                  <span class="label">Diagonal</span>
                </div>

                <div
                  onClick={() => this.visualizeBiIntelligentAstarDiag()}
                  class="option"
                >
                  <input
                    class="s-c top"
                    type="radio"
                    name="platform"
                    value="hackerrank"
                  />
                  <span class="label">BiDir+diagonal</span>
                </div>

                <div id="option-bg"></div>
              </div>
            </div>
          </form>

          <form id="app-cover">
            <div id="select-box">
              <input type="checkbox" id="options-view-button" value="ALGO" />

              <div class="mybutton">
                <a>A-Star Algorithm</a>
              </div>

              <div id="options">
                <div onClick={() => this.visualizeAstar()} class="option">
                  <input
                    class="s-c top"
                    type="radio"
                    name="platform"
                    value="codepen"
                  />
                  <span class="label">A-Star</span>
                </div>

                <div
                  onClick={() => this.visualizeBiAstarNodiagoanls()}
                  class="option"
                >
                  <input
                    class="s-c top"
                    type="radio"
                    name="platform"
                    value="dribbble"
                  />
                  <span class="label">Bi-directional</span>
                </div>

                <div onClick={() => this.visualizeOrthAstar()} class="option">
                  <input
                    class="s-c top"
                    type="radio"
                    name="platform"
                    value="behance"
                  />
                  <input
                    class="s-c bottom"
                    type="radio"
                    name="platform"
                    value="behance"
                  />
                  <span class="label">Orthogonal</span>
                </div>

                <div
                  onClick={() => this.visualizeBiAstarWithDiagonals()}
                  class="option"
                >
                  <input
                    class="s-c top"
                    type="radio"
                    name="platform"
                    value="hackerrank"
                  />
                  <span class="label">BiDir+diagonal</span>
                </div>

                <div id="option-bg"></div>
              </div>
            </div>
          </form>

          <form id="app-cover">
            <div id="select-box">
              <input type="checkbox" id="options-view-button" value="ALGO" />

              <div class="mybutton">
                <a>Best first Search</a>
              </div>

              <div id="options">
                <div onClick={() => this.visualizeBestfs()} class="option">
                  <input
                    class="s-c top"
                    type="radio"
                    name="platform"
                    value="codepen"
                  />
                  <span class="label">Best First Search</span>
                </div>

                <div onClick={() => this.visualizeBiBestfs()} class="option">
                  <input
                    class="s-c top"
                    type="radio"
                    name="platform"
                    value="dribbble"
                  />
                  <span class="label">Bi-directional</span>
                </div>

                <div onClick={() => this.visualizeBestfsDiag()} class="option">
                  <input
                    class="s-c top"
                    type="radio"
                    name="platform"
                    value="behance"
                  />
                  <input
                    class="s-c bottom"
                    type="radio"
                    name="platform"
                    value="behance"
                  />
                  <span class="label">Diagonal</span>
                </div>

                <div
                  onClick={() => this.visualizeBiBestfsDiag()}
                  class="option"
                >
                  <input
                    class="s-c top"
                    type="radio"
                    name="platform"
                    value="hackerrank"
                  />
                  <span class="label">BiDir+diagonal</span>
                </div>

                <div id="option-bg"></div>
              </div>
            </div>
          </form>

          <form id="app-cover">
            <div id="select-box">
              <input type="checkbox" id="options-view-button" value="ALGO" />

              <div class="mybutton">
                <a>Intelligent Best first Search</a>
              </div>

              <div id="options">
                <div onClick={() => this.visualizeIBestfs()} class="option">
                  <input
                    class="s-c top"
                    type="radio"
                    name="platform"
                    value="codepen"
                  />
                  <span class="label">Int. Best First</span>
                </div>

                <div onClick={() => this.visualizeIBestfsDiag()} class="option">
                  <input
                    class="s-c top"
                    type="radio"
                    name="platform"
                    value="behance"
                  />
                  <input
                    class="s-c bottom"
                    type="radio"
                    name="platform"
                    value="behance"
                  />
                  <span class="label">Diagonal</span>
                </div>

                <div id="option-bg"></div>
              </div>
            </div>
          </form>

          <form id="app-cover">
            <div id="select-box">
              <input type="checkbox" id="options-view-button" value="ALGO" />

              <div class="mybutton">
                <a>IDA Star</a>
              </div>

              <div id="options">
                <div onClick={() => this.visualizeIDAstar()} class="option">
                  <input
                    class="s-c top"
                    type="radio"
                    name="platform"
                    value="codepen"
                  />
                  <span class="label">IDA Star</span>
                </div>

                <div onClick={() => this.visualizeIDAstarDiag()} class="option">
                  <input
                    class="s-c top"
                    type="radio"
                    name="platform"
                    value="behance"
                  />
                  <input
                    class="s-c bottom"
                    type="radio"
                    name="platform"
                    value="behance"
                  />
                  <span class="label">Diagonal</span>
                </div>

                <div id="option-bg"></div>
              </div>
            </div>
          </form>

          <form id="app-cover">
            <div id="select-box">
              <input type="checkbox" id="options-view-button" value="ALGO" />

              <div class="mybutton">
                <a>Jump Point</a>
              </div>

              <div id="options">
                <div onClick={() => this.visualizeJPS()} class="option">
                  <input
                    class="s-c top"
                    type="radio"
                    name="platform"
                    value="codepen"
                  />
                  <span class="label">Jump Point</span>
                </div>

                <div onClick={() => this.visualizeOrthJPS()} class="option">
                  <input
                    class="s-c top"
                    type="radio"
                    name="platform"
                    value="dribbble"
                  />
                  <span class="label">Orthogonal</span>
                </div>

                <div id="option-bg"></div>
              </div>
            </div>
          </form>

          <div className="walls">
            WALLS
            <div className="wallweight">
              <input
                type="radio"
                id="radioApple"
                name="radioFruit"
                value="apple"
                checked={!this.state.fin}
                onChange={this.handleOptionChangeinfinite}
              />
              <label for="radioApple">Infinite Wall</label>

              <input
                type="radio"
                id="radioBanana"
                name="radioFruit"
                value="banana"
                checked={this.state.fin}
                onChange={this.handleOptionChangefinite}
              />
              <label for="radioBanana">Finite Wall</label>
            </div>
          </div>
        </div>

        <div className="inibutt">
          <div className="startendwrap">
            <div
              className="pauseresume"
              tabIndex="2"
              onClick={() =>
                alert(`     The search has been Paused
                    Click on OK to resume`)
              }
            ></div>
          </div>

          <div className="iniwrap">
            <div className="pathwall" onClick={(grid) => this.clearPath(grid)}>
              Clear Path
            </div>
          </div>

          <div className="startendwrap">
            <div
              onClick={async () => {
                window.location = "http://localhost:3000/end";
              }}
              className="startend2"
            >
              END
            </div>
          </div>

          <div className="iniwrap">
            <div className="pathwall" onClick={(grid) => this.clearwall(grid)}>
              Clear Wall
            </div>
          </div>
        </div>

        <div></div>

        <div className="gridradio">
          <div className="radiowrapper">
            HEURISTICS
            <div class="radiobutton">
              <input
                type="radio"
                id="euclidian"
                name="radiowall"
                value="euclidean"
                checked={this.state.heuristic === 1}
                onChange={this.handleheuristic1}
              />
              <label for="euclidean">Euclidean</label>
            </div>
            <div class="radiobutton">
              <input
                type="radio"
                id="manhattan"
                name="radiowall"
                value="manhattan"
                checked={this.state.heuristic === 2}
                onChange={this.handleheuristic2}
              />
              <label for="manhattan">Manhattan</label>
            </div>
            <div class="radiobutton">
              <input
                type="radio"
                id="octile"
                name="radiowall"
                value="octile"
                checked={this.state.heuristic === 3}
                onChange={this.handleheuristic3}
              />
              <label for="octile">Octile</label>
            </div>
            <div class="radiobutton">
              <input
                type="radio"
                id="chebyshev"
                name="radiowall"
                value="chebyshev"
                checked={this.state.heuristic === 4}
                onChange={this.handleheuristic4}
              />
              <label for="chebyshev">Chebyshev</label>
            </div>
          </div>

          <div className="grid">
            {grid.map((row, rowIdx) => {
              return (
                <div key={rowIdx}>
                  {row.map((node, nodeIdx) => {
                    const {
                      row,
                      col,
                      isFinish,
                      isStart,
                      isWall,
                      isWallweight,
                    } = node;
                    if (isStart || isFinish) {
                      //console.log("yo");
                      return (
                        <Node
                          key={nodeIdx}
                          col={col}
                          isFinish={isFinish}
                          isStart={isStart}
                          draggable={true}
                          isWall={isWall}
                          isWallweight={isWallweight}
                          mouseIsPressed={mouseIsPressed}
                          onDragStart={(e, isStart, isFinish) =>
                            this.handleonDragStart(e, isStart, isFinish)
                          }
                          onDrop={(e) => this.handleonDragDrop(e)}
                          //onDragOver={(event) => this.onDragOver(event)}
                          onMouseDown={(row, col) =>
                            this.handleMouseDown(row, col)
                          }
                          onMouseEnter={(row, col) =>
                            this.handleMouseEnter(row, col)
                          }
                          onMouseUp={() => this.handleMouseUp()}
                          row={row}
                        ></Node>
                      );
                    } else {
                      return (
                        <Node
                          key={nodeIdx}
                          col={col}
                          isFinish={isFinish}
                          draggable={false}
                          isStart={isStart}
                          isWall={isWall}
                          isWallweight={isWallweight}
                          mouseIsPressed={mouseIsPressed}
                          onDragStart={(e, isStart, isFinish) =>
                            this.handleonDragStart(e, isStart, isFinish)
                          }
                          onDrop={(e) => this.handleonDragDrop(e)}
                          //onDragOver={(event) => this.onDragOver(event)}
                          onMouseDown={(row, col) =>
                            this.handleMouseDown(row, col)
                          }
                          onMouseEnter={(row, col) =>
                            this.handleMouseEnter(row, col)
                          }
                          onMouseUp={() => this.handleMouseUp()}
                          row={row}
                        ></Node>
                      );
                    }
                  })}
                </div>
              );
            })}
          </div>
        </div>
      </>
    );
  }
}

const getInitialGrid = (
  startnoderow,
  startnodecol,
  finishnoderow,
  finishnodecol
) => {
  const grid = [];
  for (let row = 0; row < t_rows; row++) {
    const currentRow = [];
    for (let col = 0; col < t_cols; col++) {
      currentRow.push(
        createNode(
          col,
          row,
          startnoderow,
          startnodecol,
          finishnoderow,
          finishnodecol
        )
      );
    }
    grid.push(currentRow);
  }
  return grid;
};

const createNode = (
  col,
  row,
  startnoderow,
  startnodecol,
  finishnoderow,
  finishnodecol
) => {
  console.log(startnoderow, startnodecol, finishnoderow, finishnodecol);
  return {
    col,
    row,
    isStart: row == startnoderow && col == startnodecol,
    isFinish: row == finishnoderow && col == finishnodecol,
    distance: Infinity,
    isVisited: false,
    isWall: false,
    isWallweight: false,
    wallweight: 1,
    previousNode: null,
    gscore: Infinity,
    fscore: Infinity,
    hscore: Infinity,
    inclosed: false,
    inopen: false,
    startvisited: false,
    endvisited: false,
    nex: null,
    next: null,
  };
};
const getNewGridWithWallToggled = (grid, row, col, weight, fin) => {
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  console.log(node.isStart);
  const newNode = {
    ...node,
    isWall: !node.isWall && !fin,
    isWallweight: !node.isWallweight && fin,
  };
  if (newNode.isWall || newNode.isWallweight) {
    newNode.wallweight = weight;
  }
  newGrid[row][col] = newNode;
  //console.log(newGrid[row][col]);
  return newGrid;
};

const newStartPositions = (
  grid,
  row_i,
  col_i,
  row_f,
  col_f,
  checkStart,
  checkFinish
) => {
  const newGrid = grid.slice();
  const node_old = newGrid[row_i][col_i];
  const newNode = {
    ...node_old,
    isStart: false,
    isFinish: false,
  };
  newGrid[row_i][col_i] = newNode;
  const node_new = newGrid[row_f][col_f];
  console.log(checkStart, checkFinish);
  let start = false;
  let end = false;
  if (checkStart == "true" && checkFinish == "false") {
    start = true;
    end = false;
  }
  if (checkStart == "false" && checkFinish == "true") {
    start = false;
    end = true;
  }

  const newNode1 = {
    ...node_new,
    isStart: start,
    isFinish: end,
  };
  newGrid[row_f][col_f] = newNode1;
  return newGrid;
};
