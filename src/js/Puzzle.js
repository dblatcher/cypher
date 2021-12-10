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
        this.answerKey = Cypher.makeEmptyAlphaKeyMap() // source of future bug? - cypher won't always be alpha?
        this.selectAndClear = this.selectAndClear.bind(this);
        this.keyChangehandler = this.keyChangehandler.bind(this);
    }

    get isSolved() {
        return this.message.toUpperCase() == this.currentDecodedMessage.toUpperCase();
    }

    get encodedMessage() {
        return this.cypher.encode(this.message)
    }

    get currentDecodedMessage() {
        return new Cypher(this.answerKey).encode(this.encodedMessage, true).replaceAll('?','_')
    }

    get letterCountInEncodedMessage() {
        const { encodedMessage } = this;
        const characters = encodedMessage.split('');
        const counts = {}
        characters
            .filter(character => Cypher.alphabet.includes(character))
            .forEach(character => {
                if (typeof counts[character] === 'number') { counts[character]++ }
                else {counts[character] = 1}
            })

        return counts
    }

    get lettersUsedInEncodedMessage() {
        const { letterCountInEncodedMessage } = this;
        return Object.keys(letterCountInEncodedMessage)
    }

    render() {
        this.renderTextSection();
        this.renderAnswerSection();
    }

    selectAndClear(query) {

        const element = this.container.querySelector(query);
        if (!element) { return null }
        while (element.childElementCount > 0) {
            element.removeChild(element.children[0]);
        }
        return element;
    }

    renderTextSection() {
        const { encodedMessage, currentDecodedMessage, isSolved, container, selectAndClear } = this
        const textSection = selectAndClear("[game-role=text]");
        const textSectionTemplate = container.querySelector("template#text-section");

        const sectionNode = textSectionTemplate.content.cloneNode(true);

        sectionNode.querySelector("[data-populate=encodedMessage]").innerText = encodedMessage
        sectionNode.querySelector("[data-populate=decodedMessage]").innerText = currentDecodedMessage
        sectionNode.querySelector("[data-populate=isSolved]").innerText = isSolved ? 'solved!' : 'Not solved!'

        textSection.appendChild(sectionNode);
    }

    renderAnswerSection() {
        const { lettersUsedInEncodedMessage, letterCountInEncodedMessage, answerKey, container, keyChangehandler } = this
        const answerSection = container.querySelector("[game-role=answer]");
        const keyControlTemplate = container.querySelector("template#key-control");

        while (answerSection.childElementCount > 0) {
            answerSection.removeChild(answerSection.children[0]);
        }


        lettersUsedInEncodedMessage.forEach(letter => {
            const controlNode = keyControlTemplate.content.cloneNode(true);

            controlNode.querySelector("[data-populate=encodedCharacter]").innerText = letter
            controlNode.querySelector("[data-populate=characterCount]").innerText = letterCountInEncodedMessage[letter]

            controlNode.querySelector("input").value = answerKey[letter] || ''
            controlNode.querySelector("input").setAttribute("game-encoded", letter)
            controlNode.querySelector("input").addEventListener("input", keyChangehandler)
            controlNode.querySelector("input").addEventListener("change", keyChangehandler)

            answerSection.appendChild(controlNode)
        })
    }

    handleSolutionFound() {
        const {container} = this;
        const inputs = [...container.querySelectorAll("input[game-encoded]")];
        inputs.forEach(input => {input.setAttribute('disabled', 'true')})
    }

    keyChangehandler(event) {
        const { target: input } = event
        const codedLetter = input.getAttribute("game-encoded");

        let userGuess = safeToUpperCase(input.value) || undefined

        if (userGuess && !Cypher.alphabet.includes(userGuess)) {
            userGuess = undefined
            input.value = "";
        }

        this.answerKey[codedLetter] = userGuess
        this.renderTextSection()

        if (this.isSolved) {
            this.handleSolutionFound()
        }
    }
}

export default Puzzle;