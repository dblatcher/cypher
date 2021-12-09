import Cypher from "./cypher"
import Puzzle from "./Puzzle";
import "../scss/main.scss"

// let message = "This is my puzzle!";
let message = "Now that the table has been created and the template defined, we use JavaScript to insert rows into the table, with each row being constructed using the template as its basis.";
// let message = "the."

const puzzle = new Puzzle({
    message,
    cypher: new Cypher( Cypher.makeRandomAlphaKeyMap()),
    containerSelector: "[data-role=game-container]",
});

puzzle.render();

window.puzzle = puzzle
