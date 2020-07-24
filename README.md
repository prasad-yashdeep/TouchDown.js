# TouchDown.js

# Navigate Mars Rover using Pathfinding Algorithms


This project is in compliance with **Microsoft Engage'20**. Microsoft Engage is an initiative by **Microsoft** to aid the **Mars Colonisation Programme**.In this project,a web application has been developed which simulates a Mars rover finding a Path in the red planet .The project will visualise the shortest path from a starting point till end point avoiding all the obstructions. We have implemented  AI based shortest path algorithms like **Astar, IDAstar, Best First Search, Jump Point Search** and **Orthogonal Jump Point Search**. We have also implemented **Dijkstra** and **Breadth First Search Algorithm** to find the shortest path in the grid. We have given additional functionality of **Diagonal Search** and **Bi-Direction Search** to all possible algorithms. Along with that variuos types of heuristics measures can be selected for the AI algorithms.

To read more about the program : https://microsoft.acehacker.com/mars/
## LINK OF THE DEMO : https://hackgod2000.github.io/TouchDown.js/
## Link of the FlowChart : https://app.lucidchart.com/invitations/accept/a21c7dbf-7dc0-4f6c-af41-7a0ac7c99181
 
# Additional Functionality
We have provided the user with two kinds of walls.The user can place an infinite wall or a finite wall in the grid.The weight of the finite wall will be entered by the user through a prompt.A rover can never pass throught the infinite wall while if the rover attempts to pass throught the finite wall then the heuristic distance of the wall will suffer a penalty equal to the weight of the wall.The user can place as many kinds of finite wall with varying weights in the grid.The user can also adjust the starting point and end point of the search.

# How To run the Project
First step is to install npm in your server using the command mentioned below-:

### `sudo install npm`

Next step is to install all the Dependencies using npm-:

### `sudo npm install react-router-dom`
You can install React Router from the public npm registry with either npm or yarn. We need react-router-dom to build a web app.



### `sudo npm install react-three-fiber`
We’re going to use react-three-fiber which is essentially a powerful React renderer for three.js, both for the web and with React Native.

### `sudo npm install three`
Three.js is a cross-browser JavaScript library and application programming interface used to create and display animated 3D computer graphics in a web browser using WebGL.


### <b>Change the directory to project directory and run the below commands to run the project.</b>

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

*Note: this is a one-way operation. Once you eject, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can eject at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

# Dependencies : 
    "drei": "0.0.64",
    "heap": "^0.2.6",
    "react": "^16.13.1",
    "react-dom": "^16.13.1",
    "react-router-dom": "^5.2.0",
    "react-scripts": "3.4.1",
    "react-spring": "^8.0.27",
    "react-three-fiber": "^4.2.17",
    "three": "^0.118.3",
    "three-orbitcontrols": "^2.110.3"

