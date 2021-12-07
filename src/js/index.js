import Cypher from "./cypher"
import Puzzle from "./Puzzle";


const puzzle = new Puzzle({
    message: "This is my puzzle!",
    cypher: new Cypher( Cypher.makeRandomAlphaKeyMap()),
    containerSelector: "[data-role=game-container]",
});

puzzle.render();

window.puzzle = puzzle
