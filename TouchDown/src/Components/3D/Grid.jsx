import React, { Component } from "react";
import { Canvas } from "react-three-fiber";
import { bfs } from "../algorithms/bfs";
import { getNodesInShortestPathOrder } from "../algorithms/dijkstra";
import Controls from "../Controls";
import Point from "./Point";

const START_NODE_ROW = 10;
const START_NODE_COL = 15;
const FINISH_NODE_ROW = 10;
const FINISH_NODE_COL = 35;

export default class Grid extends Component {
  constructor() {
    super();
    this.state = {
      grid: [],
      mouseIsPressed: false,
    };
  }
  componentDidMount() {
    const grid = getInitialGrid();
    this.setState({ grid });
  }

  visualizeBFS() {
    const { grid } = this.state;
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    const visitedNodesInOrder = bfs(grid, startNode, finishNode);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    console.log(nodesInShortestPathOrder);
    //this.animate(visitedNodesInOrder, nodesInShortestPathOrder);
  }

  render() {
    const { grid, mouseIsPressed } = this.state;
    console.log(grid);
    return (
      <>
        <button onClick={() => this.visualizeBFS()}>
          Visualize BFS Algorithm
        </button>
        <Canvas
          camera={{ position: [0, 0, 10] }}
          onCreated={({ camera }) => camera.lookAt(100, 100, 4)}
        >
          <ambientLight color="#ffffff" intensity={0.1} />
          <hemisphereLight
            color="#ffffff"
            skyColor="#ffffbb"
            groundColor="#080820"
            intensity={1.0}
          />
          <Controls />
          {grid.map((row, rowIdx) => {
            return (
              <mesh key={rowIdx}>
                {row.map((node, nodeIdx) => {
                  const { row, col, isWall } = node;
                  return (
                    <Point
                      key={nodeIdx}
                      col={col}
                      // isFinish={isFinish}
                      //   //isStart={isStart}
                      isWall={isWall}
                      mouseIsPressed={mouseIsPressed}
                      onMouseDown={(row, col) => this.handleMouseDown(row, col)}
                      onMouseEnter={(row, col) =>
                        this.handleMouseEnter(row, col)
                      }
                      onMouseUp={() => this.handleMouseUp()}
                      row={row}
                    />
                  );
                })}
              </mesh>
            );
          })}
        </Canvas>
      </>
    );
  }
}

const getInitialGrid = () => {
  const grid = [];
  const numRows = 50;
  const numCols = 50;
  for (let row = 0; row < 50; row++) {
    const currentRow = [];
    for (let col = 0; col < 50; col++) {
      currentRow.push(createNode(col, row, numCols, numRows));
    }
    grid.push(currentRow);
  }
  return grid;
};

const createNode = (col, row, numCols, numRows) => {
  return {
    col,
    row,
    numRows,
    numCols,
    //isStart: row === START_NODE_ROW && col === START_NODE_COL,
    //isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
    distance: Infinity,
    isVisited: false,
    isWall: false,
    previousNode: null,
  };
};
