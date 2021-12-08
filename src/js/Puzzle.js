import Cypher from "./cypher";
import { safeToUpperCase } from "./utility";

class Puzzle {
    /**
     * @param {{
     *  message: string
     *  cypher: Cypher
     *  containerSelector: string
     * }} config 
     */
    constructor(config) {
        this.cypher = config.cypher;
        this.message = config.message
        this.container = document.querySelector(config.containerSelector);
        this.answer = new Cypher(Cypher.makeEmptyAlphaKeyMap());
    }

    get encodedMessage() {
        return this.cypher.encode(this.message)
    }

    get lettersUsedInEncodedMessage() {
        const { encodedMessage } = this;
        const characters = encodedMessage.split('');
        const uniqueCharacters = []
        characters
            .filter(character => Cypher.alphabet.indexOf(character) !== -1)
            .forEach(character => {
                if (uniqueCharacters.indexOf(character) === -1) { uniqueCharacters.push(character) }
            })

        return uniqueCharacters
    }

    render() {

        this.renderTextSection();
        this.renderAnswerSection();
    }

    renderTextSection() {
        const { encodedMessage, answer, container } = this
        const textSection = container.querySelector("[game-role=text]");


        while (textSection.childElementCount > 0) {
            textSection.removeChild(textSection.children[0]);
        }

        const messageNode = document.createElement("p");
        messageNode.innerText = "MESSAGE:  " + encodedMessage
        textSection.appendChild(messageNode);

        const answerNode = document.createElement("p");
        answerNode.innerText = "ANSWER :  " + answer.decode(encodedMessage);
        textSection.appendChild(answerNode);
    }

    renderAnswerSection() {
        const { lettersUsedInEncodedMessage, answer, container } = this
        const answerSection = container.querySelector("[game-role=answer]");
        const keyControlTemplate = container.querySelector("template#key-control");

        while (answerSection.childElementCount > 0) {
            answerSection.removeChild(answerSection.children[0]);
        }


        lettersUsedInEncodedMessage.forEach(letter => {
            const controlNode = keyControlTemplate.content.cloneNode(true);

            controlNode.querySelector("[data-populate=encodedCharacter]").innerText = letter

            controlNode.querySelector("input").value = answer.reversedKeyMap[letter] || ''
            controlNode.querySelector("input").setAttribute("game-encoded", letter)
            controlNode.querySelector("input").addEventListener("input", this.keyChangehandler.bind(this))
            controlNode.querySelector("input").addEventListener("change", this.keyChangehandler.bind(this))

            answerSection.appendChild(controlNode)
        })

    }

    setLetter(codedLetter, userGuess) {

        const { keyMap } = this.answer;

        for (let key in keyMap) {
            if (keyMap[key] === codedLetter) { keyMap[key] = undefined }
        }

        if (!userGuess) {
            return
        }

        keyMap[userGuess] = codedLetter
    }

    keyChangehandler(event) {
        const { target } = event
        const codedLetter = target.getAttribute("game-encoded");

        let userGuess = safeToUpperCase(target.value) || undefined

        if (userGuess && !Cypher.alphabet.includes(userGuess)) {
            target.value = "";
            userGuess = undefined
        }

        this.setLetter(codedLetter, userGuess)
        this.renderTextSection()
    }
}

export default Puzzle;