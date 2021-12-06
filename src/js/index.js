import Cypher from "./cypher"

const cypher = new Cypher({
    "T": "+",
    "s": "^",
},{
    upperCase: false
});

const message = "This is the message.";

const encoded = cypher.encode(message);
const decoded = cypher.decode(encoded);

console.log({ message, encoded, decoded })

console.log('errors', cypher.check());
