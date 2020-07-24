import React, { Component } from "react";

//import './point.css';

export default class Point extends Component {
  render() {
    const {
      col,
      numRows,
      numCols,
      isWall,
      onMouseDown,
      onMouseEnter,
      onMouseUp,
      row,
    } = this.props;

    // const extraClassName = isFinish
    //   ? 'node-finish'
    //   : isStart
    //   ? 'node-start'
    //   : isWall
    //   ? 'node-wall'
    //   : '';

    return (
      <mesh position={[col * 2, row * 2, 0]} rotation={[0, 0, 0]}>
        <boxBufferGeometry attach="geometry" args={[1, 1, 0]} />
        <meshStandardMaterial
          attach="material"
          wireframe={false}
          color="#a1251b"
        />
      </mesh>
    );
  }
}
