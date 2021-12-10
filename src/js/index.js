import Cypher from "./cypher"
import Puzzle from "./Puzzle";
import "../scss/main.scss"
import { pickRandomItemFrom } from "./utility";

const messages = [
    "This is my puzzle!",
    "Now that the table has been created and the template defined, we use JavaScript to insert rows into the table, with each row being constructed using the template as its basis.",
    "Do it."
]
const clearButton = document.querySelector("#clear-button")
const newButton = document.querySelector("#new-button")

function clearPuzzle() {
    if (window.puzzle) {
        window.puzzle.destroy()
    }
}

function makePuzzle() {

    clearPuzzle()

    const puzzle = new Puzzle({
        message: pickRandomItemFrom(messages),
        cypher: new Cypher(Cypher.makeRandomAlphaKeyMap()),
        containerSelector: "[data-role=game-container]",
    });

    puzzle.render();
    window.puzzle = puzzle
}

makePuzzle();
clearButton.addEventListener('click', clearPuzzle)
newButton.addEventListener('click', makePuzzle)