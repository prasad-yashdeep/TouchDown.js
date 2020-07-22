import React from "react";
import "./Model.css";

function Startpage() {
  return (
    <div className="text-box">
      <div className="heading">INSTRUCTION</div>
      <div className="text-box2">
        <p style={{ color: "#fafafa" }}>
          Welcome to Mars! You will be taken to our land where you will have
          some starting position and a destination; both can be altered by you
          accordingly. Since you are all alone here, you have to reach your
          destination as soon as possible. There will be many hurdles in your
          way, which again can be decided by you. These hurdles will be in the
          form of a weighted wall, and you have two kinds of walls: infinite
          weighted and finite weighted walls. You cannot jump over the infinite
          weighted wall at any cost whereas, in a finite weighted, you will
          first choose a weight and then apply it your land and you can jump
          over them, but this comes with some penalty. To help you find your
          way, we have a bunch of algorithms which will help you to calculate
          your <strong>shortest path</strong>. You can explore various options
          under them.
          <p style={{ color: "#fafafa" }}>
            To land on Mars, click on <strong>START</strong>!
          </p>
          <p style={{ color: "#fafafa" }}>Enjoy your journey!</p>
        </p>
      </div>
    </div>
  );
}

export default Startpage;
