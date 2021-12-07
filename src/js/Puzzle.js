import Cypher from "./cypher";

class Puzzle {
    /**
     * 
     * @param {{
     *  message: string
     *  cypher: Cypher
     *  containerSelector: string
     * }} config 
     */
    constructor(config) {
        this.cypher = config.cypher;
        this.message = config.message
        this.answer = new Cypher(Cypher.makeEmptyAlphaKeyMap());
        this.container = document.querySelector(config.containerSelector);
    }

    get encodedMessage() {
        return this.cypher.encode(this.message)
    }

    render() {
        const textSection=this.container.querySelector("[game-role=text]");

        while (textSection.childElementCount > 0){
            textSection.removeChild(textSection.children[0]);
        }

        const messageNode = document.createElement("p");
        messageNode.innerText = "MESSAGE:" + this.encodedMessage
        textSection.appendChild(messageNode);

        const answerNode = document.createElement("p");
        answerNode.innerText = "ANSWER:" + this.answer.decode(this.encodedMessage);
        textSection.appendChild(answerNode);

        const keyNode = document.createElement('ul');
        Object.keys(this.answer.keyMap).forEach(letter=> {
            let letterNode = document.createElement('li');
            letterNode.innerText = `${letter} = ${this.answer.keyMap[letter]}`
            keyNode.appendChild(letterNode);
        })
        textSection.appendChild(keyNode)

    }
}

export default Puzzle;