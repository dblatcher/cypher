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

    static TEXT_SECTION_SELECTOR = "[game-role=text]"
    static ANSWER_SECTION_SELECTOR = "[game-role=answer]"
    static INPUT_LETTER_ATTRIBUTE = "game-encoded"

    get isSolved() {
        return this.message.toUpperCase() == this.currentDecodedMessage.toUpperCase();
    }

    get encodedMessage() {
        return this.cypher.encode(this.message)
    }

    get currentDecodedMessage() {
        return new Cypher(this.answerKey).encode(this.encodedMessage, true).replaceAll('?', '_')
    }

    get letterCountInEncodedMessage() {
        const { encodedMessage } = this;
        const characters = encodedMessage.split('');
        const counts = {}
        characters
            .filter(character => Cypher.alphabet.includes(character))
            .forEach(character => {
                if (typeof counts[character] === 'number') { counts[character]++ }
                else { counts[character] = 1 }
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

    destroy() {
        const { selectAndClear } = this
        selectAndClear(Puzzle.TEXT_SECTION_SELECTOR);
        selectAndClear(Puzzle.ANSWER_SECTION_SELECTOR);
    }

    selectAndClear(query) {
        const element = this.container.querySelector(query);
        if (!element) { return null }
        while (element.childElementCount > 0) {
            element.removeChild(element.children[0]);
        }
        return element;
    }

    /**
     * Set the text content of the element a give [data-populate] value
     * @param {string} populateValue the data-populate value to find
     * @param {string} content the content to put in the matching element
     * @param {HTMLElement} container the element to search within, defaults to the game container
     */
    populate(populateValue, content, container = undefined) {
        if (!container) { container = this.container }
        const target = container.querySelector(`[data-populate=${populateValue}]`);
        if (!target) {
            console.warn(`[data-populate=${populateValue}] NOT FOUND`. container);
        }
        target.innerText = content
    }

    renderTextSection() {
        const { encodedMessage, currentDecodedMessage, isSolved, container,
            selectAndClear, populate
        } = this
        const textSection = selectAndClear(Puzzle.TEXT_SECTION_SELECTOR);
        const textSectionTemplate = container.querySelector("template#text-section");

        const sectionNode = textSectionTemplate.content.cloneNode(true);

        populate('encodedMessage', encodedMessage, sectionNode);
        populate('decodedMessage', currentDecodedMessage, sectionNode);
        populate('isSolved',  isSolved ? 'solved!' : 'Not solved!', sectionNode);

        textSection.appendChild(sectionNode);
    }

    renderAnswerSection() {
        const { lettersUsedInEncodedMessage, letterCountInEncodedMessage, answerKey, container, keyChangehandler,populate } = this
        const answerSection = container.querySelector(Puzzle.ANSWER_SECTION_SELECTOR);
        const keyControlTemplate = container.querySelector("template#key-control");

        while (answerSection.childElementCount > 0) {
            answerSection.removeChild(answerSection.children[0]);
        }


        lettersUsedInEncodedMessage.forEach(letter => {
            const controlNode = keyControlTemplate.content.cloneNode(true);

            populate('encodedCharacter',letter, controlNode)
            populate('characterCount',letterCountInEncodedMessage[letter], controlNode)

            const input = controlNode.querySelector("input");
            input.value = answerKey[letter] || ''
            input.setAttribute(Puzzle.INPUT_LETTER_ATTRIBUTE, letter)
            input.addEventListener("input", keyChangehandler)
            input.addEventListener("change", keyChangehandler)

            answerSection.appendChild(controlNode)
        })
    }

    handleSolutionFound() {
        const { container } = this;
        const inputs = [...container.querySelectorAll(`input[${Puzzle.INPUT_LETTER_ATTRIBUTE}]`)];
        inputs.forEach(input => { input.setAttribute('disabled', 'true') })
    }

    keyChangehandler(event) {
        const { target: input } = event
        const codedLetter = input.getAttribute(Puzzle.INPUT_LETTER_ATTRIBUTE);

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