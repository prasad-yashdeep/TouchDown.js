import React from "react";
import "./Model.css";

function Startpage() {
  return (
    <div className="text-box">
      <div className="myheading">WELCOME TO MARS!</div>
      <div className="text-box2">
        <li>
          You can change the <strong>STARTING POSITION</strong> and the{" "}
          <strong>DESTINATION POSITION</strong> by dragging.
        </li>
        <li>
          There will be many hurdles in your way in the form of{" "}
          <strong>WEIGHTED</strong> and <strong>INFINITE WALLS</strong>. You can
          cross the weighted wall with some penalty.
        </li>
        <li>
          Select one of the walls and click on the grid to place it over there.
        </li>
        <li>
          To help you find your way, we have a bunch of algorithms. You can
          explore various options under them.
        </li>
      </div>
      <div className="text-box3">
        To land on Mars, click on <strong>START</strong>!
      </div>
      <div className="text-box4">Enjoy your journey!</div>
    </div>
  );
}

export default Startpage;
