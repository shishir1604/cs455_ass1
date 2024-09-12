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
