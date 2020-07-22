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

const START_NODE_ROW = 0;
const START_NODE_COL = 15;
const FINISH_NODE_ROW = 10;
const FINISH_NODE_COL = 40;
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
    };
    this.handleOptionChangefinite = this.handleOptionChangefinite.bind(this);
    this.handleOptionChangeinfinite = this.handleOptionChangeinfinite.bind(
      this
    );
    // this.handleCheckfinite = this.handleCheckfinite.bind(this);
    this.handleChange2 = this.handleChange2.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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

    console.log(this.state.wallweight);
  }
  handleOptionChangeinfinite(event) {
    if (this.state.fin) {
      this.state.fin = false;
      this.state.wallweight = 99999999;
    }
    console.log(this.state.wallweight);
  }
  handleChange2(event) {
    console.log("getting weighted wall");
    this.setState({ wallweight: event.target.value });
  }
  handleSubmit(event) {
    alert("A name was submitted: " + this.state.wallweight);
    event.preventDefault();
  }
  componentDidMount() {
    const grid = getInitialGrid();
    this.setState({ grid });
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

  handleMouseUp() {
    this.setState({ mouseIsPressed: false });
  }

  animate(visitedNodesInOrder, nodesInShortestPathOrder) {
    for (let i = 1; i <= visitedNodesInOrder.length; i++) {
      console.log(this.state.pause);

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
    for (let i = 1; i < nodesInShortestPathOrder.length; i++) {
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        if (!node.isStart && !node.isFinish) {
          document.getElementById(`node-${node.row}-${node.col}`).className =
            "node node-shortest-path";
        }
      }, 50 * i);
    }
  }
  visualizeOrthAstar() {
    const { grid } = this.state;
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    const visitedNodesInOrder = Astar(grid, startNode, finishNode, 4, false);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    this.animate(visitedNodesInOrder, nodesInShortestPathOrder);
  }
  visualizeAstar() {
    const { grid } = this.state;
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    const visitedNodesInOrder = Astar(grid, startNode, finishNode, 4, true);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    this.animate(visitedNodesInOrder, nodesInShortestPathOrder);
  }
  visualizeBiAstarWithDiagonals() {
    const { grid } = this.state;
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    const visitedNodesInOrder = BiAstar(grid, startNode, finishNode, 1, true);
    const n = visitedNodesInOrder.shift();
    console.log(n[0].nex);
    console.log(n[0].previousNode);
    const nodesInShortestPathOrder = bibfsans(n[0]);
    this.animate(visitedNodesInOrder, nodesInShortestPathOrder);
  }
  visualizeBiAstarNodiagoanls() {
    const { grid } = this.state;
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    const visitedNodesInOrder = BiAstar(grid, startNode, finishNode, 1, false);
    const n = visitedNodesInOrder.shift();
    console.log(n[0].nex);
    console.log(n[0].previousNode);
    const nodesInShortestPathOrder = bibfsans(n[0]);
    this.animate(visitedNodesInOrder, nodesInShortestPathOrder);
  }
  visualizeJPS() {
    const { grid } = this.state;
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    const visitedNodesInOrder = jps(grid, startNode, finishNode, 4);
    const nodesInShortestPathOrder = jpsans(finishNode, grid);
    this.animate(visitedNodesInOrder, nodesInShortestPathOrder);
  }
  visualizeBFS() {
    console.log(this.state.wallweight);
    const { grid } = this.state;
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    const visitedNodesInOrder = bfs(grid, startNode, finishNode, false);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    this.animate(visitedNodesInOrder, nodesInShortestPathOrder);
  }
  visualizeBBFS() {
    const { grid } = this.state;
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    const visitedNodesInOrder = bbfs(grid, startNode, finishNode, false);
    const n = visitedNodesInOrder.shift();
    //const nodesInShortestPathOrder = getNodesInShortestPathOrder(n[0]);
    const nodesInShortestPathOrder = bibfsans(n[0]);
    this.animate(visitedNodesInOrder, nodesInShortestPathOrder);
  }
  visualizeBDBFS() {
    const { grid } = this.state;
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    const visitedNodesInOrder = bbfs(grid, startNode, finishNode, true);
    const n = visitedNodesInOrder.shift();
    //const nodesInShortestPathOrder = getNodesInShortestPathOrder(n[0]);
    const nodesInShortestPathOrder = bibfsans(n[0]);
    this.animate(visitedNodesInOrder, nodesInShortestPathOrder);
  }
  visualizeBFSwithdiagonals() {
    const { grid } = this.state;
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    const visitedNodesInOrder = bfs(grid, startNode, finishNode, true);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    this.animate(visitedNodesInOrder, nodesInShortestPathOrder);
  }
  visualizeOrthJPS() {
    const { grid } = this.state;
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    const visitedNodesInOrder = orthJPS(grid, startNode, finishNode, 4);
    const nodesInShortestPathOrder = orthogonalans(finishNode, grid);
    this.animate(visitedNodesInOrder, nodesInShortestPathOrder);
  }

  //shreeya
  visualizeDijkstra() {
    const { grid } = this.state;
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    var diagonalallowed = false;
    const visitedNodesInOrder = dijkstra(
      grid,
      startNode,
      finishNode,
      diagonalallowed
    );
    if (visitedNodesInOrder) {
      const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
      console.log(visitedNodesInOrder);
      console.log(nodesInShortestPathOrder);
      this.animate(visitedNodesInOrder, nodesInShortestPathOrder);
    } else {
      console.log("Path Blocked");
    }
  }
  visualizeIntelligentAstar() {
    const { grid } = this.state;
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    var heuristic = "Manhattan";
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
      console.log(visitedNodesInOrder);
      console.log(nodesInShortestPathOrder);
      this.animate(visitedNodesInOrder, nodesInShortestPathOrder);
    } else {
      console.log("Path Blocked");
    }
  }
  visualizeBiIntelligentAstar() {
    const { grid } = this.state;
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    var heuristic = "Manhattan";
    var diagonalallowed = false;
    const visitedNodesInOrder = BiIastar(
      grid,
      startNode,
      finishNode,
      heuristic,
      diagonalallowed
    );
    if (visitedNodesInOrder) {
      console.log(visitedNodesInOrder);
      const ans = visitedNodesInOrder.shift();
      console.log(ans);
      console.log(ans[0]);
      const tempo = grid[ans[0].row][ans[0].col];
      const nodesInShortestPathOrder = bidfsans(tempo);
      this.animate(visitedNodesInOrder, nodesInShortestPathOrder);
    } else {
      console.log("Path Blocked");
    }
  }
  visualizeBestfs() {
    const { grid } = this.state;
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
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
      console.log(visitedNodesInOrder);
      console.log(nodesInShortestPathOrder);
      this.animate(visitedNodesInOrder, nodesInShortestPathOrder);
    } else {
      console.log("Path Blocked");
    }
  }
  visualizeIBestfs() {
    const { grid } = this.state;
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
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
      console.log(visitedNodesInOrder);
      console.log(nodesInShortestPathOrder);
      this.animate(visitedNodesInOrder, nodesInShortestPathOrder);
    } else {
      console.log("Path Blocked");
    }
  }
  visualizeBiDijkstra() {
    const { grid } = this.state;
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    var diagonalallowed = false;
    const visitedNodesInOrder = bidijkstra(
      grid,
      startNode,
      finishNode,
      diagonalallowed
    );
    if (visitedNodesInOrder) {
      console.log(visitedNodesInOrder);
      const ans = visitedNodesInOrder.shift();
      console.log(ans);
      console.log(ans[0]);
      const tempo = grid[ans[0].row][ans[0].col];
      const nodesInShortestPathOrder = bidfsans(tempo);
      this.animate(visitedNodesInOrder, nodesInShortestPathOrder);
    } else {
      console.log("Path Blocked");
    }
  }

  visualizeBiBestfs() {
    const { grid } = this.state;
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    var heuristic = "Octile";
    var diagonalallowed = false;
    const visitedNodesInOrder = BiBestfs(
      grid,
      startNode,
      finishNode,
      heuristic,
      diagonalallowed
    );
    if (visitedNodesInOrder) {
      console.log(visitedNodesInOrder);
      const ans = visitedNodesInOrder.shift();
      console.log(ans);
      console.log(ans[0]);
      const tempo = grid[ans[0].row][ans[0].col];
      const nodesInShortestPathOrder = bidfsans(tempo);
      this.animate(visitedNodesInOrder, nodesInShortestPathOrder);
    } else {
      console.log("Path Blocked");
    }
  }
  visualizeIDAstar() {
    const { grid } = this.state;
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    var heuristic = "Octile";
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
      console.log(visitedNodesInOrder);
      console.log(nodesInShortestPathOrder);
      this.animate(visitedNodesInOrder, nodesInShortestPathOrder);
    } else {
      console.log("Path Blocked");
    }
  }
  visualizeDijkstraDiag() {
    const { grid } = this.state;
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    var diagonalallowed = true;
    const visitedNodesInOrder = dijkstra(
      grid,
      startNode,
      finishNode,
      diagonalallowed
    );
    if (visitedNodesInOrder) {
      const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
      console.log(visitedNodesInOrder);
      console.log(nodesInShortestPathOrder);
      this.animate(visitedNodesInOrder, nodesInShortestPathOrder);
    } else {
      console.log("Path Blocked");
    }
  }
  visualizeIntelligentAstarDiag() {
    const { grid } = this.state;
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    var heuristic = "Manhattan";
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
      console.log(visitedNodesInOrder);
      console.log(nodesInShortestPathOrder);
      this.animate(visitedNodesInOrder, nodesInShortestPathOrder);
    } else {
      console.log("Path Blocked");
    }
  }
  visualizeBiIntelligentAstarDiag() {
    const { grid } = this.state;
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    var heuristic = "Manhattan";
    var diagonalallowed = true;
    const visitedNodesInOrder = BiIastar(
      grid,
      startNode,
      finishNode,
      heuristic,
      diagonalallowed
    );
    if (visitedNodesInOrder) {
      console.log(visitedNodesInOrder);
      const ans = visitedNodesInOrder.shift();
      console.log(ans);
      console.log(ans[0]);
      const tempo = grid[ans[0].row][ans[0].col];
      const nodesInShortestPathOrder = bidfsans(tempo);
      this.animate(visitedNodesInOrder, nodesInShortestPathOrder);
    } else {
      console.log("Path Blocked");
    }
  }
  visualizeBestfsDiag() {
    const { grid } = this.state;
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
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
      console.log(visitedNodesInOrder);
      console.log(nodesInShortestPathOrder);
      this.animate(visitedNodesInOrder, nodesInShortestPathOrder);
    } else {
      console.log("Path Blocked");
    }
  }
  visualizeIBestfsDiag() {
    const { grid } = this.state;
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
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
      console.log(visitedNodesInOrder);
      console.log(nodesInShortestPathOrder);
      this.animate(visitedNodesInOrder, nodesInShortestPathOrder);
    } else {
      console.log("Path Blocked");
    }
  }
  visualizeBiDijkstraDiag() {
    const { grid } = this.state;
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    var diagonalallowed = true;
    const visitedNodesInOrder = bidijkstra(
      grid,
      startNode,
      finishNode,
      diagonalallowed
    );
    if (visitedNodesInOrder) {
      console.log(visitedNodesInOrder);
      const ans = visitedNodesInOrder.shift();
      console.log(ans);
      console.log(ans[0]);
      const tempo = grid[ans[0].row][ans[0].col];
      const nodesInShortestPathOrder = bidfsans(tempo);
      this.animate(visitedNodesInOrder, nodesInShortestPathOrder);
    } else {
      console.log("Path Blocked");
    }
  }

  visualizeBiBestfsDiag() {
    const { grid } = this.state;
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    var heuristic = "Octile";
    var diagonalallowed = true;
    const visitedNodesInOrder = BiBestfs(
      grid,
      startNode,
      finishNode,
      heuristic,
      diagonalallowed
    );
    if (visitedNodesInOrder) {
      console.log(visitedNodesInOrder);
      const ans = visitedNodesInOrder.shift();
      console.log(ans);
      console.log(ans[0]);
      const tempo = grid[ans[0].row][ans[0].col];
      const nodesInShortestPathOrder = bidfsans(tempo);
      this.animate(visitedNodesInOrder, nodesInShortestPathOrder);
    } else {
      console.log("Path Blocked");
    }
  }
  visualizeIDAstarDiag() {
    const { grid } = this.state;
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    var heuristic = "Octile";
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
      console.log(visitedNodesInOrder);
      console.log(nodesInShortestPathOrder);
      this.animate(visitedNodesInOrder, nodesInShortestPathOrder);
    } else {
      console.log("Path Blocked");
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

    const node = grid1[START_NODE_ROW][START_NODE_COL];
    document.getElementById(`node-${node.row}-${node.col}`).className =
      "node node-start";
    const node1 = grid1[FINISH_NODE_ROW][FINISH_NODE_COL];
    document.getElementById(`node-${node1.row}-${node1.col}`).className =
      "node node-finish";
    const grid = getInitialGrid();
    this.setState({ grid });
  }

  pauseSearch() {
    let bool1 = this.state.pause;
    bool1 = true;
    this.setState({ pause: bool1 });
  }

  clearPath() {
    console.log("calling clear path");
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
    const node = grid1[START_NODE_ROW][START_NODE_COL];
    document.getElementById(`node-${node.row}-${node.col}`).className =
      "node node-start";
    const node1 = grid1[FINISH_NODE_ROW][FINISH_NODE_COL];
    document.getElementById(`node-${node1.row}-${node1.col}`).className =
      "node node-finish";
  }

  render() {
    const { grid, mouseIsPressed, fin } = this.state;

    return (
      <>
        <div className="button-wrapper2">
          <div className="button2">SELECT ALGORITHM</div>
          {/* <div class="testf"> */}
          <div class="buttf2" tabindex="1">
            <div class="buttf">
              <div class="buttonfi">
                <a>Dijkstra Algorithm</a>
              </div>
              <div class="optf">
                <li onClick={() => this.visualizeDijkstra()}>Dijkstra</li>
                <li onClick={() => this.visualizeBiDijkstra()}>
                  Bi-directional
                </li>
                <li onClick={() => this.visualizeDijkstraDiag()}>Digonal</li>
                <li onClick={() => this.visualizeBiDijkstraDiag()}>
                  BiDir+diagonal
                </li>
              </div>
            </div>
          </div>
          <div class="buttf2" tabindex="1">
            <div class="buttf">
              <div class="buttonfi">
                <a>BFS Algorithm</a>
              </div>
              <div class="optf">
                <li onClick={() => this.visualizeBFS()}>BFS</li>
                <li onClick={() => this.visualizeBBFS()}>Bi-directional</li>
                <li onClick={() => this.visualizeBFSwithdiagonals()}>
                  Diagonal
                </li>
                <li onClick={() => this.visualizeBDBFS()}>BiDir+diagonal</li>
              </div>
            </div>
          </div>
          <div class="buttf2" tabindex="1">
            <div class="buttf">
              <div class="buttonfi">
                <a>Intelligent A-Star Algorithm</a>
              </div>
              <div class="optf">
                <li onClick={() => this.visualizeIntelligentAstar()}>A-Star</li>
                <li onClick={() => this.visualizeBiIntelligentAstar()}>
                  Bi-Directional
                </li>
                <li onClick={() => this.visualizeIntelligentAstarDiag()}>
                  Diagonal
                </li>
                <li onClick={() => this.visualizeBiIntelligentAstarDiag()}>
                  BiDir+diagonal
                </li>
              </div>
            </div>
          </div>
          <div class="buttf2" tabindex="1">
            <div class="buttf">
              <div class="buttonfi">
                <a>A-Star Algorithm</a>
              </div>
              <div class="optf">
                <li onClick={() => this.visualizeAstar()}>A-Star</li>
                <li onClick={() => this.visualizeBiAstarNodiagoanls()}>
                  Bi-directional
                </li>
                <li onClick={() => this.visualizeOrthAstar()}>Orthogal</li>
                <li onClick={() => this.visualizeBiAstarWithDiagonals()}>
                  Bidir+Diagonal
                </li>
              </div>
            </div>
          </div>
          <div class="buttf2" tabindex="1">
            <div class="buttf">
              <div class="buttonfi">
                <a>Best first Search</a>
              </div>
              <div class="optf">
                <li onClick={() => this.visualizeBestfs()}>Bestfs</li>
                <li onClick={() => this.visualizeBiBestfs()}>Bi-directional</li>
                <li onClick={() => this.visualizeBestfsDiag()}>Diagonal</li>
                <li onClick={() => this.visualizeBiBestfsDiag()}>
                  BiDir+diagonal
                </li>
              </div>
            </div>
          </div>
          <div class="buttf2" tabindex="1">
            <div class="buttf">
              <div class="buttonfi">
                <a>Intelligent Best first Search</a>
              </div>
              <div class="optf">
                <li onClick={() => this.visualizeIBestfs()}>option1</li>
                <li onClick={() => this.visualizeBiBestfs()}>option2</li>
                <li onClick={() => this.visualizeIBestfsDiag()}>option3</li>
                <li onClick={() => this.visualizeBiBestfsDiag()}>option4</li>
              </div>
            </div>
          </div>
          <div class="buttf2" tabindex="1">
            <div class="buttf">
              <div class="buttonfi">
                <a>IDA Star</a>
              </div>
              <div class="optf">
                <li onClick={() => this.visualizeIDAstar()}>IDA-Star</li>
                <li onClick={() => this.visualizeIDAstarDiag()}>Diagonal</li>
              </div>
            </div>
          </div>
          <div class="buttf2" tabindex="1">
            <div class="buttf">
              <div class="buttonfi">
                <a>Jump Point</a>
              </div>
              <div class="optf">
                <li onClick={() => this.visualizeJPS()}>Jump Point</li>
                <li onClick={() => this.visualizeOrthJPS()}>Orthogonal</li>
              </div>
            </div>
          </div>
          <div className="walls">
            WALLS
            <div className="wallweight">
              <input
                type="radio"
                id="infiwall"
                name="radiowall"
                value="finite"
                checked={!this.state.fin}
                onChange={this.handleOptionChangeinfinite}
              />
              <label for="infiwall">Infinite Wall</label>

              <input
                type="radio"
                id="fiwall"
                name="radiowall"
                value="infinite"
                checked={this.state.fin}
                onChange={this.handleOptionChangefinite}
              />
              <label for="fiwall">Finite Walls</label>
            </div>
          </div>
        </div>

        <div className="inibutt">
          <div className="startendwrap">
            <div
              className="pauseresume"
              tabIndex="2"
              onClick={() =>
                alert(`            Visualization is paused.
          Click on Resume to continue.
              `)
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
                window.location =
                  "https://hackgod2000.github.io/TouchDown.js/#/end";
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
                  return (
                    <Node
                      key={nodeIdx}
                      col={col}
                      isFinish={isFinish}
                      isStart={isStart}
                      isWall={isWall}
                      isWallweight={isWallweight}
                      mouseIsPressed={mouseIsPressed}
                      onMouseDown={(row, col) => this.handleMouseDown(row, col)}
                      onMouseEnter={(row, col) =>
                        this.handleMouseEnter(row, col)
                      }
                      onMouseUp={() => this.handleMouseUp()}
                      row={row}
                    ></Node>
                  );
                })}
              </div>
            );
          })}
        </div>
      </>
    );
  }
}

const getInitialGrid = () => {
  const grid = [];
  for (let row = 0; row < t_rows; row++) {
    const currentRow = [];
    for (let col = 0; col < t_cols; col++) {
      currentRow.push(createNode(col, row));
    }
    grid.push(currentRow);
  }
  return grid;
};

const createNode = (col, row) => {
  return {
    col,
    row,
    isStart: row === START_NODE_ROW && col === START_NODE_COL,
    isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
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
  const newNode = {
    ...node,
    isWall: !node.isWall && !fin,
    isWallweight: !node.isWallweight && fin,
  };
  if (newNode.isWall || newNode.isWallweight) {
    newNode.wallweight = weight;
  }
  newGrid[row][col] = newNode;
  console.log(newGrid[row][col]);
  return newGrid;
};
