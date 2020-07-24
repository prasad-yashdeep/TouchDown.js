import React, { Component } from "react";
import "./Node.css";

export default class Node extends Component {
  sayhello() {
    console.log("chutiye");
  }
  render() {
    const {
      col,
      isFinish,
      isStart,
      isWall,
      isWallweight,
      onDragStart,
      draggable = false,
      onMouseDown,
      onMouseEnter,
      onMouseUp,
      onDrop,
      row,
    } = this.props;
    const extraClassName = isFinish
      ? "node-finish"
      : isStart
      ? "node-start"
      : isWall
      ? "node-wall"
      : isWallweight
      ? "node-wallweight"
      : "";
    window.ondragover = function (e) {
      e.preventDefault();
      return false;
    };
    window.ondrop = function (e) {
      e.preventDefault();
      return false;
    };
    const dragEnter = (e) => {
      e.preventDefault();
      e.target.style.background = "rgba(113, 235, 52, 0.5)";
    };

    const dragLeave = (e) => {
      e.target.style.background = null;
    };
    return (
      <div
        id={`node-${row}-${col}`}
        className={`node ${extraClassName}`}
        dataS={isStart}
        dataF={isFinish}
        rowdata={row}
        coldata={col}
        draggable={draggable}
        onMouseDown={() => !draggable && onMouseDown(row, col)}
        onMouseEnter={() => !draggable && onMouseEnter(row, col)}
        onMouseUp={() => !draggable && onMouseUp()}
        //onDragEnter={(e) => !draggable && dragEnter(e)}
        //onDragLeave={(e) => !draggable && dragLeave(e)}
        onDragStart={(e) => draggable && onDragStart(e, isStart, isFinish)}
        onDrop={(e) => !draggable && onDrop(e)}
      ></div>
    );
  }
}
