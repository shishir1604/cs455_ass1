# CS455 : Introduction to Software Engineering
Refer github acions main.yml for code quality metrics and test coverage.
## Assignment 1: Develop a game

This is a game based on the popular fruit ninja game. There are several features that constitutes the final game. The main featrues of the game include spawning of the fruits. The fruits get sliced on the hover of cursor. 
Main features -
1) fruit spawn.
2) cursor cut
3) scoring and final score
game can run on loop 

Major updates have been made by including Starting screen followed by the main game and as the game ends, game over screen.
Start button starts the game 
game over screen appears with final score and restart button to play again.
Do enjoy!

Link- https://shishir1604.github.io/cs455_ass1/

## Assignment_2 : Code Quality and Testing
### Task Distribution
- **Ayush Yadav** -
  - Explore Lint and code quality metrics & duplication.
  - Implement ESlint.
  - Refactor the code to reduce the errors.
  - Explore testing to implement unit test.
  - Implement some unit test to cover methods of game.js.

- **Shishir** -
  - Explore code quality metrics tools.
  - Implement lint for CSS.
  - Refactoring the code.
  - Did unit testing of other parts of game.js using jest framework.

### Tools Used

- **ESLint**: A tool for checking JavaScript and HTML code quality using the `eslint-plugin-html` plugin.
- **StyleLint**: Ensures consistency and quality in CSS code across the project.
- **jscpd**: Detects and prevents duplicate code to maintain clean code structure.
- **Jest**: A testing framework for running unit tests to ensure code correctness.

### Summary of Commands
| Tool          | Install Command                                        | Run Command                   |
|---------------|--------------------------------------------------------|-------------------------------|
| **ESLint**    | `npm install eslint eslint-plugin-html --save-dev`     | `npx eslint .`                |
| **StyleLint** | `npm install stylelint --save-dev`                     | `npx stylelint "**/*.css"`    |
| **jscpd**     | `npm install jscpd --save-dev`                         | `npx jscpd`                   |
| **Jest**      | `npm install jest --save-dev`                          | `npx jest`                    |


### Summary of Refactoring

- **HTML**: No refactoring required.
  
- **JavaScript**: Slight refactoring was done by:
  - Adding missing curly braces.
  - Removing unexpected trailing commas.
  - Breaking lines exceeding 80 characters.

- **CSS**: Refactoring involved:
  - Removing unnecessary quotes.
  - Converting fractions to percentages.
  - Shortening color hex codes.

- **JSCPD**: No duplicates were found in the initial code.

### Summary of Testing

1. **game.test.js**
   - **Test: should add event listeners to start and restart buttons**
     - **Description:** Verifies that event listeners for `click` are added to both the `startButton` and `restartButton`.
2. **resizeCanvas.test.js**
   - **Test: should adjust canvas size when window resizes**
     - **Description:** Checks if the canvas size is updated correctly when the window is resized.
3. **updateScore.test.js**
   - **Test: should update the score correctly**
     - **Description:** Ensures that the score is updated accurately based on game events or actions.
4. **liveDecreases.test.js**
   - **Test: should decrease lives when fruits are missed**
     - **Description:** Validates that the number of lives decreases appropriately when fruits are missed in the game.
5. **gameOver.test.js**
   - **Test: should trigger game over state when lives reach zero**
     - **Description:** Confirms that the game over state is activated when the player’s lives drop to zero.
6. **buttonEvents.test.js**
   - **Test: should trigger game start on clicking start and restart buttons**
     - **Description:** Ensures that clicking the `startButton` and `restartButton` triggers the appropriate event handlers and sets `isGameOver` to `false`.
7. **drawImage.test.js**
   - **Test: should draw images on canvas correctly**
     - **Description:** Ensures that images are drawn accurately on the canvas based on game logic.
8. **clearCanvas.test.js**
   - **Test: should clear canvas before redrawing**
     - **Description:** Verifies that the canvas is cleared before new drawings are rendered to avoid visual artifacts.

## Assignment 3:  Multi-tiered Client-Server Architecture
### Task Distribution
- Worked cumulatively on testing the fetch api to post(/addscore) and get(/highscore) the data  and server retrieval when accessing root(/).
- Collaborated to write the fetchtopScore() to fetch the data from database and display in a proper format.
- **Ayush Yadav** -
  - Sorting and fetching top 10 high scores from database and displaying on endscreen.
  - Made changes in the GameObject class and game object to align with updateTest.js in order to the functionalities.
  - Fetch data and display.
  - Test Pyramid.
- **Shishir** -
  - Database creation and adding scores.
  - Added functionality to input player data and update score.
  - Made changes in mousemovement() to better test the mouse coordinates, splicing and other functionalities.
  - Architecture diagram.
 
### Integration tests ###

- **update.test.js**
  - This code sets up unit tests for a GameObject class and a gameObject function using Jest, mocking DOM elements and canvas context. It verifies that GameObject instances update their positions correctly and that new GameObject instances are added to a global array unless the game is over.

- **fetchtopscore.test.js**
  - This code tests the fetchtopScore function, which fetches high scores from a server and displays them in a leaderboard on a webpage. The tests cover the following scenarios:
     1. **Successful Fetch and Display**:
        - Mocks a successful fetch response with sample data.
        - Verifies that the fetch call is made to the correct URL.
        - Checks that the leaderboard is populated with the correct player names, scores, and formatted dates.
        - Ensures the leaderboard section is displayed.
     2. **Fetch Failure Handling**:
        - Mocks a fetch failure.
        - Verifies that an error message is logged to the console.
     3. **Missing Leaderboard Element Handling**:
        - Mocks the absence of the leaderboard element.
        - Verifies that an appropriate error message is logged to the console.

- **mouse.test.js**
  - The provided code is a set of unit tests for a JavaScript function called [`mousemovement`]. This function handles mouse movement events in a game where the player slices fruits and avoids bombs. Here's a brief explanation:
    - **Purpose**: To handle mouse movement events and update the game state based on the player's interactions.
    - **Logic**:
      1. **Check if Game is Over**: If [`global.isGameOver`] is [`true`]the function returns immediately, doing nothing.
      2. **Extract Mouse Coordinates**: The [`clientX`]and [`clientY`]properties from the event are extracted.
      3. **Iterate Over Game Objects**: For each object in [`global.gameObjects`]
         - Calculate the distance between the mouse pointer and the object.
         - If the distance is less than the object's radius:
           - If the object is a fruit, increment the score and remove the object.
           - If the object is a bomb, call the [`global.endGame`] function and remove the object.

### Unit Tests ###
 - **Setup**: Mocks necessary DOM elements and functions, and sets up the initial game state.
 - **Tests**:
   1. **Fruit Slicing**: Simulates slicing a fruit and checks if the score increments and the fruit is removed.
   2. **Bomb Slicing**: Simulates slicing a bomb and checks if the [`endGame`]function is called and the bomb is removed.
   3. **Game Over**: Ensures no actions are taken if the game is already over.
 - These tests ensure that the [`mousemovement`] function behaves correctly under different scenarios.


### Server.cjs ###
This code sets up a basic server using Express.js, a popular Node.js framework. Here's a brief overview:
1. **Dependencies**: It imports necessary modules (express, cors, sqlite3, body-parser, and path).
2. **Express App**: Creates an Express application (app) and sets the server to listen on port 3000.
3. **Middleware**:
  - cors(): Enables Cross-Origin Resource Sharing.
  - bodyParser.json(): Parses incoming JSON requests.
  - Serves static files from the css, js, and images directories.
4. **SQLite Database**:
  - Creates an in-memory SQLite database.
  - Defines a scores table if it doesn't already exist.
5. **Routes**:
  - POST /addScore: Adds a new score to the scores table.
  - GET /high-score: Retrieves the top 10 high scores, ordered by score in descending order.
  - GET /: Serves the index.html file.
6. **Server Initialization**: Starts the server if the script is run directly.
 - This setup allows you to add and retrieve high scores for a game, with the data stored in an in-memory SQLite database.

### Refactoring ###
 - game.js: added functionality to input player and fetch data from database to display score as well as update the current player score in database.

### Testing Pyramid ###
  - ![Testing diagram](https://github.com/shishir1604/cs455_ass1/blob/main/Diagrams/Testing%20Pyramid.png)
### Game Logic ###
  - ![Game Logic](https://github.com/shishir1604/cs455_ass1/blob/main/Diagrams/Game%20Logic.png)
### Client-Server Architecture ###
  - ![Client-Server Architecture](https://github.com/shishir1604/cs455_ass1/blob/main/Diagrams/Client-Server%20Architecture.png)

## Assignment 4: Performance Testing and Reliability Enhancements
**Primary Server** [PS1](https://cs455-ass1.onrender.com) [PS2](https://cs455-ass1-1.onrender.com)
**Backup Server** [BS](https://twocs455-ass1.onrender.com)
**LoadBalancer Server** [LB](https://cs455-loadbalancer.onrender.com)
### Part 1: Performance Testing
**Server-Side Performance Testing**
  - k6 or Artillery for script-based load testing in JavaScript.
  - Setup: Simulate 10 concurrent users requesting your game page


